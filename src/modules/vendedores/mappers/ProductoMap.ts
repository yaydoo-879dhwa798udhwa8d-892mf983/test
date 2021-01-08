import { Mapper } from "../../../core/infra/Mapper";
import { Producto } from "../domain/productos/producto";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";

import { ProductoNombre } from "../domain/productos//productoNombre";
import { ProductoSku } from "../domain/productos//productoSku";
import { ProductoCantidad } from "../domain/productos//productoCantidad";
import { ProductoPrecio } from "../domain/productos//productoPrecio";
import { ProductoVendedor } from "../domain/productos//productoVendedor";

export class ProductoMap extends Mapper<Producto> {
    public static toPersistence(producto: Producto): any {
        return {
            id: producto.id.toString(),
            nombre: producto.nombre.value,
            sku: producto.sku.value,
            cantidad: producto.cantidad.value,
            precio: producto.precio.value,
            vendedor: producto.vendedor.value,
        };
    }

    public static toDomain(raw: any): Producto {
        const productoNombreOrError = ProductoNombre.create(raw.email);
        const productoSkuOrError = ProductoSku.create(raw.email);
        const productoCantidadOrError = ProductoCantidad.create(raw.email);
        const productoPrecioOrError = ProductoPrecio.create(raw.email);
        const productoVendedorOrError = ProductoVendedor.create(raw.email);

        const productoOrError = Producto.create(
            {
                nombre: productoNombreOrError.getValue(),
                sku: productoSkuOrError.getValue(),
                cantidad: productoCantidadOrError.getValue(),
                precio: productoPrecioOrError.getValue(),
                vendedor: productoVendedorOrError.getValue(),
            },
            new UniqueEntityID(raw.id)
        );

        productoOrError.isFailure ? console.log(productoOrError.error) : "";

        return productoOrError.isSuccess ? productoOrError.getValue() : null;
    }
}
