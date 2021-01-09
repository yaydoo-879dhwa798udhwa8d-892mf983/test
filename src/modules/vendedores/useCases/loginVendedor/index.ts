import { LoginVendedorController } from "./LoginVendedorController";
import { LoginVendedorUseCase } from "./LoginVendedorUseCase";
import { vendedoresRepo } from "../../repos";

const loginVendedorUseCase = new LoginVendedorUseCase(vendedoresRepo);
const loginVendedorController = new LoginVendedorController(
    loginVendedorUseCase
);

export { loginVendedorUseCase, loginVendedorController };
