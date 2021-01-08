import { Server } from "../../config";

import { first_router } from "./api/v1";
import app from "./app";

app.use(first_router.routes());

app.listen(Server.port);
