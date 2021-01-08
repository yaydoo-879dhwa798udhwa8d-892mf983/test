import Koa from "koa";
import bodyParser = require("koa-bodyparser");
import morgan from "koa-morgan";
import fs from "fs";
var path = require("path");
const respond = require("koa-respond");

import "../../../modules/administradores/repos/index";

const app = new Koa();

var accessLogStream = fs.createWriteStream(
    path.join(process.cwd() + "/logs", "access.log"),
    {
        flags: "a",
    }
);
const errHandler = async (ctx, next) => {
    return next().catch((err) => {
        const { statusCode, message } = err;

        ctx.type = "json";
        ctx.status = statusCode || 500;
        ctx.body = {
            status: "error",
            message,
        };

        ctx.app.emit("error", err, ctx);
    });
};
app.use(errHandler);
app.use(respond());
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser());

export default app;
