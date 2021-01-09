import app from "./index";
import Koa from "koa";
describe("App instance", () => {
  it("Should be app from Koa", () => {
      let testApp = new Koa()
        expect(typeof app).toBe(typeof testApp);
    });
});
