import knexInstance from "../../../infra/knex/index";

import { ProductosRepo } from "./productosRepo";
import { VendedoresRepo } from "./vendedoresRepo";

const productosRepo = new ProductosRepo(knexInstance);
const vendedoresRepo = new VendedoresRepo(knexInstance);

export { productosRepo, vendedoresRepo };
