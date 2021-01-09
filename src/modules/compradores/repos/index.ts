import { ProductosRepo } from "./productosRepo";

import knexInstance from "../../../infra/knex/index";

const productosRepo = new ProductosRepo(knexInstance);

export { productosRepo };
