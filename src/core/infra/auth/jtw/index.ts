import path from "path";
import { readFile } from "fs";
import { promisify } from "util";
import { sign, verify } from "jsonwebtoken";
import {
    InternalError,
    TokenExpiredError,
    BadTokenError,
    ApiError,
} from "./ApiError";
import Koa from "koa";

export class JWT {
    private static readPublicKey(): Promise<string> {
        return promisify(readFile)(
            path.join(process.cwd(), "/keys/cert.pem"),
            "utf8"
        );
    }

    private static readPrivateKey(): Promise<string> {
        return promisify(readFile)(
            path.join(process.cwd(), "/keys/private.pem"),
            "utf8"
        );
    }
    public static async encode(
        ctx?: Koa.Context,
        payload?: JwtPayload
    ): Promise<string> {
        const cert = await this.readPrivateKey();
        if (!cert) ApiError.handle(new InternalError(), ctx);
        // @ts-ignore
        return promisify(sign)({ ...payload }, cert, { algorithm: "RS256" });
    }
    /**
     * This method checks the token and returns the decoded data when token is valid in all respect
     */
    public static async validate(
        ctx: Koa.Context,
        token: string
    ): Promise<JwtPayload> {
        const cert = await this.readPublicKey();
        try {
            // @ts-ignore
            return (await promisify(verify)(token, cert)) as JwtPayload;
        } catch (e) {
            if (e && e.name === "TokenExpiredError")
                ApiError.handle(new TokenExpiredError(), ctx);
            // throws error if the token has not been encrypted by the private key

            ApiError.handle(new BadTokenError(), ctx);
        }
    }
    /**
     * Returns the decoded payload if the signature is valid even if it is expired
     */
    public static async decode(ctx, token: string): Promise<JwtPayload> {
        const cert = await this.readPublicKey();
        try {
            console.log(token);
            // @ts-ignore
            return (await promisify(verify)(token, cert, {
                ignoreExpiration: true,
            })) as JwtPayload;
        } catch (e) {
            console.log(e);
            ApiError.handle(new BadTokenError(), ctx);
        }
    }
}

export class JwtPayload {
    aud: string;
    sub: string;
    iss: string;
    iat: number;
    exp: number;
    prm: string;

    constructor(
        issuer: string,
        audience: string,
        subject: string,
        param: string,
        validity: number
    ) {
        this.iss = issuer;
        this.aud = audience;
        this.sub = subject;
        this.iat = Math.floor(Date.now() / 1000);
        this.exp = this.iat + validity * 24 * 60 * 60;
        this.prm = param;
    }
}
