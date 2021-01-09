import { AggregateRoot } from "../../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { Result } from "../../../../core/logic/Result";
import { VendedorId } from "./vendedorId";
import { VendedorEmail } from "./vendedorEmail";
import { Guard } from "../../../../core/logic/Guard";
import { VendedorCreatedEvent } from "./events/vendedorCreatedEvent";
import { VendedorPassword } from "./vendedorPassword";

interface VendedorProps {
    email: VendedorEmail;
    password: VendedorPassword;
}

export class Vendedor extends AggregateRoot<VendedorProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get vendedorId(): VendedorId {
        return VendedorId.caller(this.id);
    }

    get email(): VendedorEmail {
        return this.props.email;
    }

    get password(): VendedorPassword {
        return this.props.password;
    }

    private constructor(props: VendedorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: VendedorProps,
        id?: UniqueEntityID
    ): Result<Vendedor> {
        const guardedProps = [{ argument: props.email, argumentName: "email" }];

        guardedProps.push({
            argument: props.password,
            argumentName: "password",
        });

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Vendedor>(guardResult.message);
        } else {
            const user = new Vendedor(
                {
                    ...props,
                },
                id
            );

            const idWasProvided = !!id;

            if (!idWasProvided) {
                user.addDomainEvent(new VendedorCreatedEvent(user));
            }

            return Result.ok<Vendedor>(user);
        }
    }
}
