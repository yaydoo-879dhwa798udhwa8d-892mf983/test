// protected

import Koa from "koa";

import {
    getAccessToken,
    validateTokenData,
} from "../../../core/logic/Auth/JWT/index";

import { JWT } from "../../../core/infra/auth/jtw/index";

export const accessProtected = async (ctx: Koa.Context, next: Koa.Next) => {
    const aT = getAccessToken(ctx);
    const token_payload = await JWT.decode(ctx, aT);
    await validateTokenData(ctx, token_payload);
    ctx.request.headers["id"] = token_payload.sub;
    await next();
};
