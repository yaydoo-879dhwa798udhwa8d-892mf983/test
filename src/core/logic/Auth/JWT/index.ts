import {
    AuthFailureError,
    InternalError,
    ApiError,
} from "../../../infra/auth/jtw/ApiError";

import { JwtPayload, JWT } from "../../../infra/auth/jtw";
import { TokenInfo } from "../../../../config";
import Koa from "koa";

export const getAccessToken = (ctx: Koa.Context) => {
    const authorization = ctx.request.headers["authorization"];
    if (!authorization || !authorization.startsWith("Bearer "))
        ApiError.handle(new AuthFailureError(), ctx);
    return authorization.split(" ")[1];
};

export const validateTokenData = (
    ctx: Koa.Context,
    payload: JwtPayload
): boolean => {
    if (
        !payload ||
        !payload.iss ||
        !payload.sub ||
        !payload.aud ||
        payload.iss !== TokenInfo.config.issuer ||
        payload.aud !== TokenInfo.config.audience
    )
        ApiError.handle(new AuthFailureError(), ctx);
    return true;
};

declare interface User {
    id: string;
    email: string;
    password: string;
}
declare interface Tokens {
    accessToken: string;
}

export const createTokens = async (
    user: User,
    accessTokenKey: string,
    ctx: Koa.Context
): Promise<Tokens> => {
    const accessToken = await JWT.encode(
        ctx,
        new JwtPayload(
            TokenInfo.config.issuer,
            TokenInfo.config.audience,
            user.id,
            accessTokenKey,
            TokenInfo.config.accessTokenValidityDays
        )
    );

    if (!accessToken) ApiError.handle(new InternalError(), ctx);

    return {
        accessToken: accessToken,
    } as Tokens;
};
