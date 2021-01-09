import { ValueObject } from "../../../../core/domain/ValueObject";
import { Result } from "../../../../core/logic/Result";
import { Guard } from "../../../../core/logic/Guard";

interface ProductoCantidadProps {
    value: number;
}

export class ProductoCantidad extends ValueObject<ProductoCantidadProps> {
    get value(): number {
        return this.props.value;
    }

    private constructor(props: ProductoCantidadProps) {
        super(props);
    }

    public static create(cantidad: number): Result<ProductoCantidad> {
        const guardResult = Guard.againstNullOrUndefined(cantidad, "cantidad");
        if (!guardResult.succeeded) {
            return Result.fail<ProductoCantidad>(guardResult.message);
        } else {
            return Result.ok<ProductoCantidad>(
                new ProductoCantidad({ value: cantidad })
            );
        }
    }
}
