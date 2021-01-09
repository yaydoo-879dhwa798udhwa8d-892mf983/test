import { Result } from "./Result";
import { UseCaseError } from "./UseCaseError";

/**
 * @method GenericAppError
 * @namespace
 * @desc Class for generate a generic Error for API
 */
export namespace GenericAppError {
    export class UnexpectedError extends Result<UseCaseError> {
        public constructor(err: any) {
            super(false, {
                message: "Some Error Ocurred",
                error: err,
            } as UseCaseError);
        }
        public static create(err: any): UnexpectedError {
            return new UnexpectedError(err);
        }
    }
}
