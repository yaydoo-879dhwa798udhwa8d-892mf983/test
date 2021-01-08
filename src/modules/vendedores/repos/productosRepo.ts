import { Console } from "console";
import Knex from "knex";

import { Producto } from "../domain/productos/producto";

import { ProductoSku } from "../domain/productos/productoSku";
import { ProductoMap } from "../mappers/ProductoMap";

interface IProducto {
    id: string;
    nombre: string;
    sku: string;
    cantidad: number;
    precio: number;
    vendedor: string;
}
interface IParams {
    nombre?: string;
    sku?: string;
    cantidad?: number;
    min_price?: number;
    max_price?: number;
    vendedor?: string;
}

export class ProductosRepo {
    private knexInstance: Knex;
    constructor(knex: Knex) {
        this.knexInstance = knex;
    }
    public async getProductosWithParams(
        params: IParams,
        sortBy: string = "nombre",
        sortOrder: string = "asc",
        offset: number = 0,
        limit: number = 5
    ): Promise<IProducto[]> {
        const productos: IProducto[] = (await this.knexInstance<IProducto>(
            "productos"
        )
            .select("id", "nombre", "sku", "cantidad", "precio", "vendedor")

            .where((builder) => {
                if (params.min_price) {
                    builder.andWhere("precio", ">=", params.min_price);
                }
                if (params.max_price) {
                    builder.andWhere("precio", "<=", params.max_price);
                }
                if (params.cantidad)
                    builder.andWhere("cantidad", params.cantidad);
                if (params.sku) builder.andWhere("sku", params.sku);
                if (params.nombre) builder.andWhere("nombre", params.nombre);
                if (params.vendedor) {
                    builder.andWhere("vendedor", params.vendedor);
                }
            })
            .orderBy(sortBy, sortOrder)
            .offset(offset)
            .limit(limit)) as IProducto[];
        return productos;
    }
    public async exists(sku: ProductoSku): Promise<boolean> {
        const productoExist = await this.getProductosWithParams({
            sku: sku.value,
        });
        return productoExist.length > 1 ? true : false;
    }
    async setProducto(producto: IProducto): Promise<IProducto> {
        const seller: IProducto = await this.knexInstance<IProducto>(
            "productos"
        ).insert({
            id: producto.id,
            nombre: producto.nombre,
            sku: producto.sku,
            cantidad: producto.cantidad,
            precio: producto.precio,
            vendedor: producto.vendedor,
        });
        return seller;
    }
    public async save(producto: Producto): Promise<void> {
        const exists = await this.exists(producto.sku);
        const rawProducto = ProductoMap.toPersistence(producto);
        try {
            if (!exists) {
                await this.setProducto(rawProducto);
            } else {
                //En caso de que exista, modificar!
            }
        } catch (r) {
            console.log(r);
        }
    }
}
