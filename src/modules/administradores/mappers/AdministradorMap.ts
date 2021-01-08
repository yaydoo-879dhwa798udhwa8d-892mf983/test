import { Mapper } from "../../../core/infra/Mapper";
import { Administrador } from "../domain/administradores/administrador";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { AdministradorEmail } from "../domain/administradores/administradorEmail";
import { AdministradorPassword } from "../domain/administradores/administradorPassword";

export class AdministradorMap extends Mapper<Administrador> {
    public static toPersistence(administrador: Administrador): any {
        return {
            id: administrador.id.toString(),
            email: administrador.email.value,
            password: administrador.password.value,
        };
    }

    public static toDomain(raw: any): Administrador {
        const administradorEmailOrError = AdministradorEmail.create(raw.email);
        const administradorPasswordOrError = AdministradorPassword.create(raw.password);

        const administradorOrError = Administrador.create(
            {
                email: administradorEmailOrError.getValue(),
                password: administradorPasswordOrError.getValue(),
            },
            new UniqueEntityID(raw.id)
        );

        administradorOrError.isFailure ? console.log(administradorOrError.error) : "";

        return administradorOrError.isSuccess ? administradorOrError.getValue() : null;
    }
}
