import { UseCase } from "../../../../core/domain/UseCase";
import { GenericAppError } from "../../../../core/logic/AppError";
import { Either, Result, left, right } from "../../../../core/logic/Result";

import { LoginAdministradorDTO } from "./LoginAdministradorDTO";
import { AdministradorEmail } from "../../domain/administradores/administradorEmail";
import { AdministradorPassword } from "../../domain/administradores/administradorPassword";
import { Administrador } from "../../domain/administradores/administrador";
import { AdminsRepo } from "../../repos/adminsRepo";
import { LoginAdministradoresErrors } from "./LoginAdministradorErrors";
import { createTokens } from "../../../../core/logic/Auth/JWT";

import crypto from "crypto";

type Response = Either<
    | GenericAppError.UnexpectedError
    | LoginAdministradoresErrors.AccountDoesntExists
    | Result<any>,
    Result<void>
>;
export class LoginAdministradorUseCase
    implements UseCase<LoginAdministradorDTO, Promise<Response>> {
    private administradorRepo: AdminsRepo;
    constructor(administradorRepo: AdminsRepo) {
        this.administradorRepo = administradorRepo;
    }

    async execute(req: LoginAdministradorDTO): Promise<Response> {
        
        
        const emailOrError = AdministradorEmail.create(req.email);
        
        const passwordOrError = AdministradorPassword.create({
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
        
        const administradorOrError = Administrador.create({
            email: emailOrError.getValue(),
            password: passwordOrError.getValue(),
        });

        if (administradorOrError.isFailure) {
            return left(
                Result.fail<void>(combinedPropsResult.error)
            ) as Response;
        }

        const administrador: Administrador = administradorOrError.getValue();

        const administradorAlreadyExists = await this.administradorRepo.exists(
            administrador.email
        );

        if (!administradorAlreadyExists) {
            return left(
                new LoginAdministradoresErrors.AccountDoesntExists(
                    administrador.email.value
                )
            ) as Response;
        }
        const administradorExists = await this.administradorRepo.getAdministradorByEmailAndPassword(
            administrador.email,
            administrador.password
        );
        console.log(administradorExists)
        let token;
        try {
            // regresar tokens
            const accessTokenKey = crypto.randomBytes(64).toString("hex");
            token = await createTokens(
                {
                    id: administradorExists.id.toString(),
                    email: administradorExists.email.value,
                    password: administradorExists.password.value,
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
