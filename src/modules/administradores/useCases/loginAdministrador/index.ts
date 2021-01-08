import { LoginAdministradorController } from "./LoginAdministradorController";
import { LoginAdministradorUseCase } from "./LoginAdministradorUseCase";
import { adminsRepo } from "../../repos";

const loginAdministradorUseCase = new LoginAdministradorUseCase(adminsRepo);
const loginAdministradorController = new LoginAdministradorController(
    loginAdministradorUseCase
);

export { loginAdministradorUseCase, loginAdministradorController };
