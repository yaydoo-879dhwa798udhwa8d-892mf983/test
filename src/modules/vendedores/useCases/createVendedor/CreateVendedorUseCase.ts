import { UseCase } from "../../../../core/domain/UseCase";
import { GenericAppError } from "../../../../core/logic/AppError";
import { Either, Result, left, right } from "../../../../core/logic/Result";

import { CreateVendedorDTO } from "./CreateVendedorDTO";
import { VendedorEmail } from "../../domain/vendedores/vendedorEmail";
import { VendedorPassword } from "../../domain/vendedores/vendedorPassword";
import { Vendedor } from "../../domain/vendedores/vendedor";
import { VendedoresRepo } from "../../repos/vendedoresRepo";
import { CreateVendedorErrors } from "./CreateVendedorErrors";

type Response = Either<
    | GenericAppError.UnexpectedError
    | CreateVendedorErrors.AccountAlreadyExists
    | Result<any>,
    Result<void>
>;

export class CreateVendedorUseCase
    implements UseCase<CreateVendedorDTO, Promise<Response>> {
    private vendedorRepo: VendedoresRepo;

    constructor(vendedorRepo: VendedoresRepo) {
        this.vendedorRepo = vendedorRepo;
    }

    async execute(req: CreateVendedorDTO): Promise<Response> {
        console.log(req);
        const emailOrError = VendedorEmail.create(req.email);
        const passwordOrError = VendedorPassword.create({
            value: req.password,
        });

        const combinedPropsResult = Result.combine([
            emailOrError,
            passwordOrError,
        ]);

        if (combinedPropsResult.isFailure) {
            return left(
                Result.fail<void>(combinedPropsResult.error)
            ) as Response;
        }

        const vendedorOrError = Vendedor.create({
            email: emailOrError.getValue(),
            password: passwordOrError.getValue(),
        });

        if (vendedorOrError.isFailure) {
            return left(
                Result.fail<void>(combinedPropsResult.error)
            ) as Response;
        }

        const vendedor: Vendedor = vendedorOrError.getValue();

        const vendedorAlreadyExists = await this.vendedorRepo.exists(
            vendedor.email
        );

        if (vendedorAlreadyExists) {
            return left(
                new CreateVendedorErrors.AccountAlreadyExists(
                    vendedor.email.value
                )
            ) as Response;
        }

        try {
            await this.vendedorRepo.save(vendedor);
        } catch (err) {
            return left(new GenericAppError.UnexpectedError(err)) as Response;
        }

        return right(Result.ok<void>()) as Response;
    }
}
