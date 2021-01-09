import Router from "koa-router";
import Koa from "koa";

import { createUserController } from "../../../useCases/createVendedor";
import { createProductoController } from "../../../useCases/createProducto/";
import { loginVendedorController } from "../../../useCases/loginVendedor";
import { getProductosController } from "../../../useCases/getProductos";
import { accessProtected } from "../../../../../infra/http/auth";

const vendedor_router = new Router();

const omega = async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.body = "Hello Tessa World! ";
};

vendedor_router.post("/vendedores/signup", async (ctx) => {
    await createUserController.execute(ctx);
});
vendedor_router.post("/vendedores/productos", accessProtected, async (ctx) => {
    await createProductoController.execute(ctx);
});

vendedor_router.post("/vendedores/login", async (ctx) => {
    await loginVendedorController.execute(ctx);
});
vendedor_router.get("/vendedores/productos",accessProtected, getProductosController);

export { vendedor_router };
