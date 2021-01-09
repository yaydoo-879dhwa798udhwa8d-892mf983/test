// TODO Vendedores Tests
import Koa from "koa";

const request = require("supertest");
import { vendedor_router } from "./index";
const app = new Koa();
app.use(vendedor_router.routes());

describe("REST VENDEDORES", () => {
    describe("TOKENS", () => {
        it("/vendedores Auth valid/invalid token 200/401", async () => {
            // Send valid token
            /* const response = await request(app.callback()).post(
          "/vendedores/productos"
            );
            console.log(response.status);
            expect(response.status).toBe(200);
            // Send wrong token
            const response = await request(app.callback()).post(
                "/vendedores/productos"
            );
            console.log(response.status);
            expect(response.status).toBe(401); 
            */
        });
    });
    describe("SIGNUP", () => {
        it("/vendedores/signup Vendedor Created 201", async () => {
            //Send valid credentials
            //expect(response.status).toBe(201);
        });
        it("/vendedores/signup Vendedor already Exists 422", async () => {
            //Re send valid credentials
            //expect(response.status).toBe(201);
        });
        it("/vendedores/signup wrong credentials 422", async () => {
            //Send wrong credentials
            //expect(response.status).toBe(201);
        });
    });
    describe("LOGIN", () => {
        it("/vendedores/login wrong credentials response 422", async () => {
            //Send wrong credentials
            //expect(response.status).toBe(422);
        });
        it("/vendedores/login valid credentials response 200", async () => {
            //Send valid credentials
            //expect(response.status).toBe(200);
        });
    });
    describe("PRODUCTOS", () => {
        it.todo("/vendedores/productos Crear producto 200");

        it("/vendedores/productos invalid product 422", async () => {
            /* const response = await request(app.callback()).post(
            "/vendedoresistradores/productos"
        );
        console.log(response.status);
        expect(response.status).toBe(422); */
        });
        it.todo("/vendedores/productos nombre pagination 200");
        it.todo("/vendedores/productos sku pagination 200");
        it.todo("/vendedores/productos cantidad pagination 200");
        it.todo("/vendedores/productos min_price pagination 200");
        it.todo("/vendedores/productos max_price pagination 200");
    });
});
