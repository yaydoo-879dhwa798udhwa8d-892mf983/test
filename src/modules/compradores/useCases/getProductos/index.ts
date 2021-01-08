import Koa from "Koa"; /* 
import { ApiError } from "../../../../core/infra/auth/jtw/ApiError";
import { NoHeadersError } from "../../../../core/infra/auth/jtw/ApiError"; */
import knexInstance from "../../../../infra/knex";

import { ProductosRepo } from "../../repos/productosRepo";
const getProductosController = async (ctx: Koa.Context, next: Koa.Next) => {
    const params = {};
    if (ctx.request.headers["nombre"]) {
        params["nombre"] = ctx.request.headers["nombre"];
    }
    if (ctx.request.headers["sku"]) {
        params["sku"] = ctx.request.headers["sku"];
    }
    if (ctx.request.headers["cantidad"]) {
        params["cantidad"] = ctx.request.headers["cantidad"];
    }
    if (ctx.request.headers["min_price"]) {
        params["min_price"] = ctx.request.headers["min_price"];
    }
    if (ctx.request.headers["max_price"]) {
        params["max_price"] = ctx.request.headers["max_price"];
    }
    let sortBy, sortOrder, offset, limit;
    if (ctx.request.headers["sortBy"]) {
        sortBy = ctx.request.headers["sortBy"];
    }
    if (ctx.request.headers["sortOrder"]) {
        sortOrder = ctx.request.headers["sortOrder"];
    }
    if (ctx.request.headers["offset"]) {
        offset = ctx.request.headers["offset"];
    }
    if (ctx.request.headers["limit"]) {
        limit = ctx.request.headers["limit"];
    }
    const productosInstance = new ProductosRepo(knexInstance);
    ctx.response.status = 200;
    console.log(params);
    let productos = await productosInstance.getProductosWithParams(params);
    ctx.response.body = { data: productos };
};

export { getProductosController };
