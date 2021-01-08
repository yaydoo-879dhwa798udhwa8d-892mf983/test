import { ValueObject } from "../../../../core/domain/ValueObject";
import { Result } from "../../../../core/logic/Result";
import { Guard } from "../../../../core/logic/Guard";

interface ProductoNombreProps {
    value: string;
}

export class ProductoNombre extends ValueObject<ProductoNombreProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: ProductoNombreProps) {
        super(props);
    }

    public static create(nombre: string): Result<ProductoNombre> {
        const guardResult = Guard.againstNullOrUndefined(nombre, "nombre");
        if (!guardResult.succeeded) {
            return Result.fail<ProductoNombre>(guardResult.message);
        } else {
            return Result.ok<ProductoNombre>(
                new ProductoNombre({ value: nombre })
            );
        }
    }
}
