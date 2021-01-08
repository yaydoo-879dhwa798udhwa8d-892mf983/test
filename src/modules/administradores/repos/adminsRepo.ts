import Knex from "knex";

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
}
