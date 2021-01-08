import { CreateProductoController } from "./CreateProductoController";
import { CreateProductoUseCase } from "./CreateProductoUseCase";
import { productosRepo } from "../../repos";

const createProductoUseCase = new CreateProductoUseCase(productosRepo);
const createProductoController = new CreateProductoController(
    createProductoUseCase
);

export { createProductoUseCase, createProductoController };
