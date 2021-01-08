/* /* const Router = require("koa-router");
 
import Router from "koa-router";
import Koa from "koa";
import {
    getAccessToken,
    createTokens,
    validateTokenData,
} from "../../../core/logic/Auth/JWT/index";
import { JWT } from "../../../core/infra/auth/jtw/index";
import crypto from "crypto";

const first_router = new Router();

 const helloW = async (ctx: Koa.Context, next: Koa.Next) => {
    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const accesst = await createTokens(
        { id: "asoidknasdo", email: "asdsad", password: "aoksndsaiouj" },
        accessTokenKey,
        ctx
    );
    const token_payload = await JWT.decode(accesst.accessToken);
    console.log(token_payload);
    const token_valid = await validateTokenData(ctx, token_payload);
    console.log(token_valid);
    await next();
}; 
const omega = async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.body = "Hello Tessa World! ";
};
import {accessProtected} from "../auth/index"
first_router.get("/", accessProtected, omega); */

import { vendedor_router } from "../../../modules/vendedores/infra/http/routes";

import { admin_router } from "../../../modules/administradores/infra/http/routes";

import { comprador_router } from "../../../modules/compradores/infra/http/routes";

import Router from "koa-router";

const first_router = new Router();

first_router.use(vendedor_router.routes());
first_router.use(admin_router.routes());
first_router.use(comprador_router.routes());

export { first_router };
