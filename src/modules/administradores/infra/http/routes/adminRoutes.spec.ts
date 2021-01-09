// TODO Admin Tests
import Koa from "koa";

const request = require("supertest");
import { admin_router } from "./index";
const app = new Koa();
app.use(admin_router.routes());

describe("REST ADMIN", () => {
    describe("TOKENS", () => {
        it("/administradores Auth valid/invalid token 200/401", async () => {
            // Send valid token
            /* const response = await request(app.callback()).post(
                  "/administradores/productos"
              );
              console.log(response.status);
              expect(response.status).toBe(200);
              // Send wrong token
              const response = await request(app.callback()).post(
                  "/administradores/productos"
              );
              console.log(response.status);
              expect(response.status).toBe(401); 
              */
        });
    });
    describe("LOGIN", () => {
        it("/administradores/login wrong credentials response 422", async () => {
            //Send wrong credentials
            //expect(response.status).toBe(422);
        });
        it("/administradores/login valid credentials response 200", async () => {
            //Send valid credentials
            //expect(response.status).toBe(200);
        });
    });
    describe("PRODUCTOS", () => {
        it("/administradores/productos invalid product 422", async () => {
            /* const response = await request(app.callback()).post(
          "/administradoresistradores/productos"
          );
          console.log(response.status);
          expect(response.status).toBe(422); */
        });
        it.todo("/administradores/productos vendedor pagination 200");
        it.todo("/administradores/productos nombre pagination 200");
        it.todo("/administradores/productos sku pagination 200");
        it.todo("/administradores/productos cantidad pagination 200");
        it.todo("/administradores/productos min_price pagination 200");
        it.todo("/administradores/productos max_price pagination 200");
    });
});
