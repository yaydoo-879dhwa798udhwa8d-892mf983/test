import Knex from "knex";
import { Vendedor } from "../domain/vendedores/vendedor";

import { VendedorEmail } from "../domain/vendedores/vendedorEmail";
import { VendedorMap } from "../mappers/VendedorMap";

export interface IVendedor {
    id: string;
    email: string;
    password: string;
}

export class VendedoresRepo {
    private knexInstance: Knex;
    constructor(knex: Knex) {
        this.knexInstance = knex;
    }
    public async getVendedorById(id: string): Promise<Vendedor> {
        const vendedor: Vendedor = ((await this.knexInstance<Vendedor>(
            "vendedores"
        )
            .select("id", "email", "password")
            .where("id", id)) as Vendedor[])[0];
        return vendedor;
    }
    public async getVendedorByEmail(email: VendedorEmail): Promise<Vendedor> {
        const vendedor: Vendedor = ((await this.knexInstance<Vendedor>(
            "vendedores"
        )
            .select("id", "email", "password")
            .where("email", email.value.toString())) as Vendedor[])[0];
        return vendedor;
    }
    public async exists(email: VendedorEmail): Promise<boolean> {
        const vendedorExist = await this.getVendedorByEmail(email);
        return vendedorExist ? true : false;
    }
    public async setVendedor(vendedor: IVendedor): Promise<IVendedor> {
        const seller: IVendedor = await this.knexInstance<IVendedor>(
            "vendedores"
        ).insert({
            id: vendedor.id,
            email: vendedor.email,
            password: vendedor.password,
        });
        return seller;
    }
    public async save(vendedor: Vendedor): Promise<void> {
        const exists = await this.exists(vendedor.email);
        const rawVendedor = VendedorMap.toPersistence(vendedor);
        try {
            if (!exists) {
                await this.setVendedor(rawVendedor);
            } else {
                //En caso de que exista, modificar!
            }
        } catch (r) {
            console.log(r);
        }
    }
}
