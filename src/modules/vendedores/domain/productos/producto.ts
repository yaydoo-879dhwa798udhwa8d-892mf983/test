import { AggregateRoot } from "../../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { Result } from "../../../../core/logic/Result";
import { Guard } from "../../../../core/logic/Guard";

import { ProductoId } from "./productoId";
import { ProductoNombre } from "./productoNombre";
import { ProductoSku } from "./productoSku";
import { ProductoCantidad } from "./productoCantidad";
import { ProductoPrecio } from "./productoPrecio";
import { ProductoVendedor } from "./productoVendedor";
import { ProductoCreatedEvent } from "./events/productoCreateEvent";

interface ProductoProps {
    nombre: ProductoNombre;
    sku: ProductoSku;
    cantidad: ProductoCantidad;
    precio: ProductoPrecio;
    vendedor: ProductoVendedor;
}

export class Producto extends AggregateRoot<ProductoProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get productoId(): ProductoId {
        return ProductoId.caller(this.id);
    }

    get nombre(): ProductoNombre {
        return this.props.nombre;
    }
    get sku(): ProductoSku {
        return this.props.sku;
    }
    get cantidad(): ProductoCantidad {
        return this.props.cantidad;
    }
    get precio(): ProductoPrecio {
        return this.props.precio;
    }
    get vendedor(): ProductoVendedor {
        return this.props.vendedor;
    }

    private constructor(props: ProductoProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: ProductoProps,
        id?: UniqueEntityID
    ): Result<Producto> {
        const guardedProps = [
            { argument: props.nombre, argumentName: "nombre" },
            { argument: props.sku, argumentName: "sku" },
            { argument: props.cantidad, argumentName: "cantidad" },
            { argument: props.precio, argumentName: "precio" },
            { argument: props.vendedor, argumentName: "vendedor" },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Producto>(guardResult.message);
        } else {
            const producto = new Producto(
                {
                    ...props,
                },
                id
            );

            const idWasProvided = !!id;

            if (!idWasProvided) {
                producto.addDomainEvent(new ProductoCreatedEvent(producto));
            }

            return Result.ok<Producto>(producto);
        }
    }
}
