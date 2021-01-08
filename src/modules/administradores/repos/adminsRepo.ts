import Knex from "knex";
import { Administrador } from "../domain/administradores/administrador";

import { AdministradorEmail } from "../domain/administradores/administradorEmail";
import { AdministradorPassword } from "../domain/administradores/administradorPassword";
import { AdministradorMap } from "../mappers/AdministradorMap";
export interface IAdmin {
    id: string;
    email: string;
    password: string;
}

export class AdminsRepo {
    private knexInstance: Knex;
    constructor(knex: Knex) {
        this.knexInstance = knex;
    }
    public async getAdminById(id: string): Promise<IAdmin> {
        const admin: IAdmin = ((await this.knexInstance<IAdmin>(
            "administradores"
        )
            .select("id", "email", "password")
            .where("id", id)) as IAdmin[])[0];
        return admin;
    }
    public async getAdminByEmail(email: string): Promise<IAdmin> {
        const admin: IAdmin = ((await this.knexInstance<IAdmin>(
            "administradores"
        )
            .select("id", "email", "password")
            .where("email", email)) as IAdmin[])[0];
        return admin;
    }
    public async getAdministradorByEmailAndPassword(
        email: AdministradorEmail,
        password: AdministradorPassword
    ): Promise<Administrador> {
        const administrador: Administrador = ((await this.knexInstance<Administrador>(
            "administradores"
        )
            .select("id", "email", "password")
            .where("email", email.value.toString())
            .andWhere(
                "password",
                password.value.toString()
            )) as Administrador[])[0];
        return administrador;
    }
    public async exists(email: AdministradorEmail): Promise<boolean> {
        const vendedorExist = await this.getAdminByEmail(email.value);
        return vendedorExist ? true : false;
    }
}
