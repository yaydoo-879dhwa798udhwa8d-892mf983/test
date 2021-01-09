import Knex from "knex";

const knexConfig: Knex.Config = {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: { min: 0, max: 7 },
};
const knexInstance = Knex(knexConfig);
export default knexInstance;

/* const { attachPaginate } = require("knex-paginate");
attachPaginate();

interface IAdmin {
    id: string;
    email: string;
    password: string;
}

const getAdminById = async (id: string): Promise<IAdmin> => {
    const admin: IAdmin = ((await knexInstance<IAdmin>("administradores")
        .select("id", "email", "password")
        .where("id", id)) as IAdmin[])[0];
    return admin;
};
const getAdminByEmail = async (email: string): Promise<IAdmin> => {
    const admin: IAdmin = ((await knexInstance<IAdmin>("administradores")
        .select("id", "email", "password")
        .where("email", email)) as IAdmin[])[0];
    return admin;
};
interface IVendedor {
    id: string;
    email: string;
    password: string;
}
const getVendedorById = async (id: string): Promise<IVendedor> => {
    const vendedor: IVendedor = ((await knexInstance<IVendedor>("vendedores")
        .select("id", "email", "password")
        .where("id", id)) as IVendedor[])[0];
    return vendedor;
};
const getVendedorByEmail = async (email: string): Promise<IVendedor> => {
    const vendedor: IVendedor = ((await knexInstance<IVendedor>("vendedores")
        .select("id", "email", "password")
        .where("email", email)) as IVendedor[])[0];
    return vendedor;
};

const setVendedor = async (vendedor: IVendedor): Promise<IVendedor> => {
    const seller: IVendedor = await knexInstance<IVendedor>(
        "vendedores"
    ).insert({
        id: vendedor.id,
        email: vendedor.email,
        password: vendedor.password,
    });
    return seller;
}; */

/* interface IProducto {
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
} */

/* const setProducto = async (producto: IProducto): Promise<IProducto> => {
    const seller: IProducto = await knexInstance<IProducto>("productos").insert(
        {
            id: producto.id,
            nombre: producto.nombre,
            sku: producto.sku,
            cantidad: producto.cantidad,
            precio: producto.precio,
            vendedor: producto.vendedor,
        }
    );
    return seller;
}; */

/* const getProductosWithParams = async (
    params: IParams,
    sortBy: string = "nombre",
    sortOrder: string = "asc",
    offset: number = 0,
    limit: number = 5
): Promise<IProducto[]> => {
    const productos: IProducto[] = (await knexInstance<IProducto>("productos")
        .select("id", "nombre", "sku", "cantidad", "precio", "vendedor")

        .where((builder) => {
            if (params.min_price) {
                builder.andWhere("precio", ">=", params.min_price);
            }
            if (params.max_price) {
                builder.andWhere("precio", "<=", params.max_price);
            }
            if (params.cantidad) builder.andWhere("cantidad", params.cantidad);
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
}; */

const testing = async () => {
    console
        .log
        /* await getProductosWithParams(
            {
                vendedor: "08f171de-304e-493d-9337-b8a5989e97e3",
            },
            "precio",
            "asc"
        ) */
        /* await setVendedor({
            id: "08f171de-304e-493d-9337-b8a5989e97e3",
            email: "testingomega@yaydoo.com",
            password: "asiodmsaiod",
        }) */
        /* await setProducto({
            id: "9e04a938-b5ab-49a5-a46d-b359bc722ce4",
            nombre: "Chinolas de paja",
            sku: "9e04a938-b5ab-49a5-a46d-b359bc342ce4",
            cantidad: 69,
            precio: 56.34,
            vendedor: "08f171de-304e-493d-9337-b8a5989e97e3",
        }) */
        ();
};
// testing();
