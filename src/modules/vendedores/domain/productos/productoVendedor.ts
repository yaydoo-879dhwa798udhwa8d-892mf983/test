import { ValueObject } from "../../../../core/domain/ValueObject";
import { Result } from "../../../../core/logic/Result";
import { Guard } from "../../../../core/logic/Guard";

interface ProductoVendedorProps {
    value: string;
}

export class ProductoVendedor extends ValueObject<ProductoVendedorProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: ProductoVendedorProps) {
        super(props);
    }

    public static create(vendedor: string): Result<ProductoVendedor> {
        const guardResult = Guard.againstNullOrUndefined(vendedor, "vendedor");
        if (!guardResult.succeeded) {
            return Result.fail<ProductoVendedor>(guardResult.message);
        } else {
            return Result.ok<ProductoVendedor>(
                new ProductoVendedor({ value: vendedor })
            );
        }
    }
}
