// TODO Admin Tests
import Koa from "koa";

const request = require("supertest");
import { comprador_router } from "./index";
const app = new Koa();
app.use(comprador_router.routes());

describe("REST COMPRADORES", () => {
    describe("PRODUCTOS", () => {
        it("/compradores/productos invalid product 422", async () => {
            /* const response = await request(app.callback()).post(
          "/compradores/productos"
            );
            console.log(response.status);
            expect(response.status).toBe(422); */
        });
        it.todo("/compradores/productos nombre pagination 200");
        it.todo("/compradores/productos sku pagination 200");
        it.todo("/compradores/productos cantidad pagination 200");
        it.todo("/compradores/productos min_price pagination 200");
        it.todo("/compradores/productos max_price pagination 200");
    });
});
