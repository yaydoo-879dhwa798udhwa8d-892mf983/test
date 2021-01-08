import { CreateVendedorController } from "./CreateVendedorController";
import { CreateVendedorUseCase } from "./CreateVendedorUseCase";
import { vendedoresRepo } from "../../repos";

const createUserUseCase = new CreateVendedorUseCase(vendedoresRepo);
const createUserController = new CreateVendedorController(createUserUseCase);

export { createUserUseCase, createUserController };
