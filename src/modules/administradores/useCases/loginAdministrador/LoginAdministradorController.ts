import { BaseController } from "../../../../core/infra/BaseController";
import { LoginAdministradorUseCase } from "./LoginAdministradorUseCase";
import { LoginAdministradorDTO } from "./LoginAdministradorDTO";
import { LoginAdministradoresErrors } from "./LoginAdministradorErrors";
import * as yup from "yup";

export class LoginAdministradorController extends BaseController {
    private useCase: LoginAdministradorUseCase;

    constructor(useCase: LoginAdministradorUseCase) {
        super();
        this.useCase = useCase;
    }
    validateEmail(email: string): Promise<boolean> {
        let schema = yup.object().shape({
            email: yup.string().email(),
        });
        console.log(email);
        return schema.isValid({ email: email });
    }
    validatePassword(password: string): Promise<boolean> {
        let schema = yup.object().shape({
            password: yup.string().min(8),
        });
        return schema.isValid({ password: password });
    }

    async validateBody(js: {}) {
        let result;
        console.log(Object.keys(js).length);
        if (Object.keys(js).length == 0) {
            this.unEntity("Fields required");
        }
        if (!js["email"]) {
            this.unEntity("Field 'email' required");
        }
        if (!js["password"]) {
            this.unEntity("Field 'password' required");
        }
        result = await this.validateEmail(js["email"]);
        if (!result) {
            this.unEntity("Invalid email format");
        }
    }

    async executeTEMP(): Promise<any> {
        await this.validateBody(this.ctx.request.body);
        const dto: LoginAdministradorDTO = this.ctx.request
            .body as LoginAdministradorDTO;
        try {
            const result = await this.useCase.execute(dto);
            const aux = result;
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case LoginAdministradoresErrors.AccountDoesntExists:
                        this.conflict(error.errorValue().message);

                        break;
                    default:
                        this.fail(error.errorValue().message);
                        break;
                }
            } else {
                console.log(aux.value);
                this.ok(this.ctx, { data: aux.value.getValue() });
            }
        } catch (err) {
            this.fail(err);
        }
    }
}
