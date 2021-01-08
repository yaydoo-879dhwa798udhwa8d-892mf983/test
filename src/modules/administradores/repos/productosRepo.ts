

export interface IProductosRepo {
    exists(id?: string, sku?: string, vendedor?: string);
}
