import { AggregateRoot } from "../../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { Result } from "../../../../core/logic/Result";
import { AdministradorId } from "./administradorId";
import { AdministradorEmail } from "./administradorEmail";
import { Guard } from "../../../../core/logic/Guard";
import { AdministradorCreatedEvent } from "./events/administradorCreatedEvent";
import { AdministradorPassword } from "./administradorPassword";

interface AdministradorProps {
    email: AdministradorEmail;
    password: AdministradorPassword;
}

export class Administrador extends AggregateRoot<AdministradorProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get administradorId(): AdministradorId {
        return AdministradorId.caller(this.id);
    }

    get email(): AdministradorEmail {
        return this.props.email;
    }

    get password(): AdministradorPassword {
        return this.props.password;
    }

    private constructor(props: AdministradorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: AdministradorProps,
        id?: UniqueEntityID
    ): Result<Administrador> {
        const guardedProps = [{ argument: props.email, argumentName: "email" }];

        guardedProps.push({
            argument: props.password,
            argumentName: "password",
        });

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Administrador>(guardResult.message);
        } else {
            const user = new Administrador(
                {
                    ...props,
                },
                id
            );

            const idWasProvided = !!id;

            if (!idWasProvided) {
                user.addDomainEvent(new AdministradorCreatedEvent(user));
            }

            return Result.ok<Administrador>(user);
        }
    }
}
