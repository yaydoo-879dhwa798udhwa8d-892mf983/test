import { UseCase } from "../../../../core/domain/UseCase";
import { GenericAppError } from "../../../../core/logic/AppError";
import { Either, Result, left, right } from "../../../../core/logic/Result";

import { LoginVendedorDTO } from "./LoginVendedorDTO";
import { VendedorEmail } from "../../domain/vendedores/vendedorEmail";
import { VendedorPassword } from "../../domain/vendedores/vendedorPassword";
import { Vendedor } from "../../domain/vendedores/vendedor";
import { VendedoresRepo } from "../../repos/vendedoresRepo";
import { LoginVendedorErrors } from "./LoginVendedorErrors";
import { createTokens } from "../../../../core/logic/Auth/JWT";

import crypto from "crypto";
import Koa from "koa";

type Response = Either<
    | GenericAppError.UnexpectedError
    | LoginVendedorErrors.AccountDoesntExists
    | Result<any>,
    Result<void>
>;
interface Tokens {
    accessToken: string;
}
export class LoginVendedorUseCase
    implements UseCase<LoginVendedorDTO, Promise<Response>> {
    private vendedorRepo: VendedoresRepo;
    private koaMck = new Koa();
    constructor(vendedorRepo: VendedoresRepo) {
        this.vendedorRepo = vendedorRepo;
    }

    async execute(req: LoginVendedorDTO): Promise<Response> {
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

        if (!vendedorAlreadyExists) {
            return left(
                new LoginVendedorErrors.AccountDoesntExists(
                    vendedor.email.value
                )
            ) as Response;
        }
        const vendedorExists = await this.vendedorRepo.getVendedorByEmailAndPassword(
            vendedor.email,
            vendedor.password
        );
        let token;
        try {
            // regresar tokens
            const accessTokenKey = crypto.randomBytes(64).toString("hex");
            token = await createTokens(
                {
                    id: vendedorExists.id.toString(),
                    email: vendedorExists.email.value,
                    password: vendedorExists.password.value,
                },
                accessTokenKey
            );
            console.log(token);
        } catch (err) {
            console.log(err);
            return left(new GenericAppError.UnexpectedError(err)) as Response;
        }

        return right(Result.ok<void>(token)) as Response;
    }
}
