import Router from "koa-router";
import Koa from "Koa";

import { createUserController } from "../../../useCases/createVendedor";

const vendedor_router = new Router();

const omega = async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.body = "Hello Tessa World! ";
};

vendedor_router.post("/vendedores/signup",  async (ctx) => {
    await createUserController.execute(ctx);
});
vendedor_router.post("/vendedores/login", omega);
vendedor_router.post("/vendedores/productos", omega);
vendedor_router.get("/vendedores/productos", omega);

export { vendedor_router };
