import { ValueObject } from "../../../../core/domain/ValueObject";
import { Result } from "../../../../core/logic/Result";
import { Guard } from "../../../../core/logic/Guard";

interface AdministradorEmailProps {
    value: string;
}

export class AdministradorEmail extends ValueObject<AdministradorEmailProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: AdministradorEmailProps) {
        super(props);
    }

    public static create(email: string): Result<AdministradorEmail> {
        const guardResult = Guard.againstNullOrUndefined(email, "email");
        if (!guardResult.succeeded) {
            return Result.fail<AdministradorEmail>(guardResult.message);
        } else {
            return Result.ok<AdministradorEmail>(
                new AdministradorEmail({ value: email })
            );
        }
    }
}
