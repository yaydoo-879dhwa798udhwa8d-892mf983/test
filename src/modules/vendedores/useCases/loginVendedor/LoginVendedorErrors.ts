import { UseCaseError } from "../../../../core/logic/UseCaseError";
import { Result } from "../../../../core/logic/Result";

export namespace LoginVendedorErrors {
    export class AccountDoesntExists extends Result<UseCaseError> {
        constructor(email: string) {
            super(false, {
                message: `The email ${email} doesnt exists `,
            } as UseCaseError);
        }
    }
}
