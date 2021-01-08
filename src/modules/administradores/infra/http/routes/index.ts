import Router from "koa-router";
import Koa from "Koa";

const admin_router = new Router();

const omega = async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.body = "Hello Tessa World! ";
};

admin_router.post("/administradores/login", omega);
admin_router.get("/administradores/productos", omega);

export { admin_router };
