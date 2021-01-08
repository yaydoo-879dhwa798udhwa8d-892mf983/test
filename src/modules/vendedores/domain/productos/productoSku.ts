import { ValueObject } from "../../../../core/domain/ValueObject";
import { Result } from "../../../../core/logic/Result";
import { Guard } from "../../../../core/logic/Guard";

interface ProductoSkuProps {
    value: string;
}

export class ProductoSku extends ValueObject<ProductoSkuProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: ProductoSkuProps) {
        super(props);
    }

    public static create(sku: string): Result<ProductoSku> {
        const guardResult = Guard.againstNullOrUndefined(sku, "sku");
        if (!guardResult.succeeded) {
            return Result.fail<ProductoSku>(guardResult.message);
        } else {
            return Result.ok<ProductoSku>(new ProductoSku({ value: sku }));
        }
    }
}
