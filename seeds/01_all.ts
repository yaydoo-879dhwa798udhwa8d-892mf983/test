import * as Knex from "knex";
import faker from "faker";

const useSeedsSafely = (knex) => (tables) => {
    const addSeeds = tables.map(({ name, data }) => {
        console.log(data);
        return knex(name).insert(data);
    });

    return Promise.all(addSeeds).catch((e) => {
        const dropData = tables.map(({ name }) => {
            return knex(name).del();
        });
        return Promise.all(dropData).then(() => Promise.reject(e));
    });
};

export async function seed(knex: Knex): Promise<void> {
    const administradoresSeed = [
        {
            id: faker.random.uuid(),
            email: "omega@yaydoo.com",
            password: "54321",
        },
    ];
    const vendedoresSeed = [
        {
            id: faker.random.uuid(),
            email: "test@yaydoo.com",
            password: "12345",
        },
        {
            id: faker.random.uuid(),
            email: "test2@yaydoo.com",
            password: "12345",
        },
    ];
    const productosSeed = [];

    for (let i = 0; i < 50; i++) {
        let producto = {
            id: faker.random.uuid(),
            nombre: faker.commerce.productName(),
            sku: faker.random.uuid(),
            cantidad: faker.random.number(600),
            precio: faker.commerce.price(1, 20000, 2),
            vendedor: vendedoresSeed[faker.random.number(1)].id,
        };
        productosSeed.push(producto);
    }

    const seeds = [
        {
            name: "productos",
            data: productosSeed,
        },
        {
            name: "administradores",
            data: administradoresSeed,
        },
        {
            name: "vendedores",
            data: vendedoresSeed,
        },
    ];
    await useSeedsSafely(knex)(seeds);
}
