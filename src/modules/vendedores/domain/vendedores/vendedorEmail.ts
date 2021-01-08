import { ValueObject } from "../../../../core/domain/ValueObject";
import { Result } from "../../../../core/logic/Result";
import { Guard } from "../../../../core/logic/Guard";

interface VendedorEmailProps {
    value: string;
}

export class VendedorEmail extends ValueObject<VendedorEmailProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: VendedorEmailProps) {
        super(props);
    }

    public static create(email: string): Result<VendedorEmail> {
        const guardResult = Guard.againstNullOrUndefined(email, "email");
        if (!guardResult.succeeded) {
            return Result.fail<VendedorEmail>(guardResult.message);
        } else {
            return Result.ok<VendedorEmail>(
                new VendedorEmail({ value: email })
            );
        }
    }
}
