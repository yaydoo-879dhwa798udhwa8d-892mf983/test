import Router from "koa-router";
import Koa from "koa";

const comprador_router = new Router();

const omega = async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.body = "Hello Tessa World! ";
};
import { getProductosController } from "../../../useCases/getProductos";

comprador_router.get("/compradores/productos", getProductosController);

export { comprador_router };
