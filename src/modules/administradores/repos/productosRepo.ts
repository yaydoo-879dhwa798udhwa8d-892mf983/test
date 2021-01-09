import Knex from "knex";

export interface IProducto {
    id: string;
    nombre: string;
    sku: string;
    cantidad: number;
    precio: number;
    vendedor: string;
}
export interface IParams {
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
        console.log(params)
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
}
