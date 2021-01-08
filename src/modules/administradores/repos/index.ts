import { AdminsRepo } from "./adminsRepo";
import { ProductosRepo } from "./productosRepo";

import knexInstance from "../../../infra/knex/index";

const adminsRepo = new AdminsRepo(knexInstance);
const productosRepo = new ProductosRepo(knexInstance);


export { adminsRepo, productosRepo };
