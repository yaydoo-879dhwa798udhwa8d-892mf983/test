import Koa from "koa";

/**
 * Base controller
 * Koa Handler
 *
 */
export abstract class BaseController {
    public ctx: Koa.Context;
    protected abstract executeTEMP(): Promise<void | any>;
    public async execute(ctx: Koa.Context): Promise<void> {
        this.ctx = ctx;
        await this.executeTEMP();
    }
    public jsonResponse(code: number, message: string): any {
        this.ctx.response.status = code;
        this.ctx.body = {
            message: message,
        };
    }
    public ok<T>(ctx: Koa.Context, dto?: T) {
        console.log("aqui");
        ctx["status"] = 200;
        if (!!dto) {
            ctx.body = dto;
        }
        return ctx.toJSON();
    }
    public notOk<T>(code: number, message) {
        this.ctx.throw(code, message);
    }
    public created(message?: string): any {
        return this.jsonResponse(201, message ? message : "Created");
    }
    public clientError(message?: string): any {
        this.notOk(400, message ? message : "Unauthorized");
    }
    public unauthorized(message?: string): any {
        this.notOk(401, message ? message : "Unauthorized");
    }

    public notFound(message?: string): any {
        this.notOk(404, message ? message : "Not found");
    }

    public conflict(message?: string): any {
        this.notOk(409, message ? message : "Conflict");
    }

    public unEntity(message?: string): any {
        this.notOk(422, message ? message : "Unprocessable Entity");
    }
    public fail(error: Error | string) {
        this.notOk(500, error ? error.toString() : "Server Error");
    }
}
