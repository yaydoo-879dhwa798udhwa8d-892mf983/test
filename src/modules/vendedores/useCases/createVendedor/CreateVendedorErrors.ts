import { UseCaseError } from "../../../../core/logic/UseCaseError";
import { Result } from "../../../../core/logic/Result";

export namespace CreateVendedorErrors {
    export class AccountAlreadyExists extends Result<UseCaseError> {
        constructor(email: string) {
            super(false, {
                message: `The email ${email} associated for this account already exists`,
            } as UseCaseError);
        }
    }
}
