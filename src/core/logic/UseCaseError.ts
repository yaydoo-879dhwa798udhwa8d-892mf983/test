interface IUseCaseErrorError {
    message: string;
}

/**
 * @class UseCaseError
 * @namespace
 * @abstract
 * @desc Class for generate a Use Case as error
 */
export abstract class UseCaseError implements IUseCaseErrorError {
    public readonly message: string;
    constructor(message: string) {
        this.message = message;
    }
}
