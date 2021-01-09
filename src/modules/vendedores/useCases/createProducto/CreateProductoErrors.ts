import { UseCaseError } from "../../../../core/logic/UseCaseError";
import { Result } from "../../../../core/logic/Result";

export namespace CreateProductoErrors {
    export class ProductAlreadyExists extends Result<UseCaseError> {
        constructor(id: string) {
            super(false, {
                message: `The product ${id} associated for this account already exists`,
            } as UseCaseError);
        }
    }
}
