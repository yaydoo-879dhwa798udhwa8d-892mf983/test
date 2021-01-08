import { ValueObject } from "../../../../core/domain/ValueObject";
import { Result } from "../../../../core/logic/Result";
import { Guard } from "../../../../core/logic/Guard";

interface ProductoPrecioProps {
    value: number;
}

export class ProductoPrecio extends ValueObject<ProductoPrecioProps> {
    get value(): number {
        return this.props.value;
    }

    private constructor(props: ProductoPrecioProps) {
        super(props);
    }

    public static create(precio: number): Result<ProductoPrecio> {
        const guardResult = Guard.againstNullOrUndefined(precio, "precio");
        if (!guardResult.succeeded) {
            return Result.fail<ProductoPrecio>(guardResult.message);
        } else {
            return Result.ok<ProductoPrecio>(
                new ProductoPrecio({ value: precio })
            );
        }
    }
}
