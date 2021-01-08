import * as Knex from "knex";

const createTablesSafely = (knex) => (tables) => {
    const createTables = tables.map(({ name, schema }) => {
        return knex.schema.createTable(name, schema);
    });

    return Promise.all(createTables).catch((e) => {
        const dropTables = tables.map(({ name }) => {
            return knex.schema.dropTableIfExists(name);
        });
        console.log(dropTables);
        return Promise.all(dropTables).then(() => Promise.reject(e));
    });
};

const dropTablesSafely = (knex) => (tables) => {
    const dropT = tables.map(({ name }) => {
        return knex.schema.dropTable(name);
    });

    return Promise.all(dropT).catch((e) => {
        const dropTables = tables.map(({ name }) => {
            return knex.schema.dropTable(name);
        });

        return Promise.all(dropTables).then(() => Promise.reject(e));
    });
};

export async function up(knex: Knex): Promise<any> {
    return createTablesSafely(knex)([
        {
            name: "vendedores",
            schema(vendedoresTable) {
                vendedoresTable.uuid("id").primary();
                vendedoresTable.string("email").unique();
                vendedoresTable.string("password");
                vendedoresTable
                    .timestamp("created_at")
                    .defaultTo(knex.fn.now());
            },
        },
        {
            name: "administradores",
            schema(adminsTable) {
                adminsTable.uuid("id").primary();
                adminsTable.string("email").unique();
                adminsTable.string("password");
                adminsTable.timestamp("created_at").defaultTo(knex.fn.now());
            },
        },
        {
            name: "productos",
            schema(productosTable) {
                productosTable.uuid("id").primary();
                productosTable.string("nombre");
                productosTable.string("sku");
                productosTable.integer("cantidad");
                productosTable.decimal("precio", 8, 2);
                productosTable.string("vendedor");
                productosTable.timestamp("created_at").defaultTo(knex.fn.now());
            },
        },
    ]);
}

export async function down(knex: Knex): Promise<any> {
    return dropTablesSafely(knex)([
        {
            name: "vendedores",
        }, 
        {
            name: "administradores",
        },
        {
            name: "productos",
        }, 
    ]);
}
