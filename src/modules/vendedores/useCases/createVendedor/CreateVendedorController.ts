import { BaseController } from "../../../../core/infra/BaseController";
import { CreateVendedorUseCase } from "./CreateVendedorUseCase";
import { CreateVendedorDTO } from "./CreateVendedorDTO";
import { CreateVendedorErrors } from "./CreateVendedorErrors";
import * as yup from "yup";

export class CreateVendedorController extends BaseController {
    private useCase: CreateVendedorUseCase;

    constructor(useCase: CreateVendedorUseCase) {
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
        result = await this.validatePassword(js["password"]);

        if (!result) {
            this.unEntity("Password is too short - should be 8 chars minimum.");
        }
    }

    async executeTEMP(): Promise<any> {
        await this.validateBody(this.ctx.request.body);
        console.log("Pasamos validacion");
        const dto: CreateVendedorDTO = this.ctx.request
            .body as CreateVendedorDTO;
        console.log("dto:" + dto.email);
        try {
            const result = await this.useCase.execute(dto);
            console.log(result);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case CreateVendedorErrors.AccountAlreadyExists:
                        this.conflict(error.errorValue().message);

                        break;
                    default:
                        this.fail(error.errorValue().message);
                        break;
                }
            } else {
                this.created();
            }
        } catch (err) {
            this.fail(err);
        }
    }
}
