import Router from "koa-router";
import Koa from "Koa";

const comprador_router = new Router();

const omega = async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.body = "Hello Tessa World! ";
};

comprador_router.get("/compradores/productos", omega);

export { comprador_router };
