import Router from "koa-router";
import Koa from "Koa";

const admin_router = new Router();

import { accessProtected } from "../../../../../infra/http/auth";
import { loginAdministradorController } from "../../../useCases/loginAdministrador";
import { getProductosController } from "../../../useCases/getProductos";

admin_router.get(
    "/administradores/productos",
    accessProtected,
    getProductosController
);
admin_router.post("/administradores/login", async (ctx) => {
    await loginAdministradorController.execute(ctx);
});

export { admin_router };
