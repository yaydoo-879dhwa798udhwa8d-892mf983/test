import { UseCase } from "../../../../core/domain/UseCase";
import { GenericAppError } from "../../../../core/logic/AppError";
import { Either, Result, left, right } from "../../../../core/logic/Result";

import { CreateProductoDTO } from "./CreateProductoDTO";

import { ProductoNombre } from "../../domain/productos/productoNombre";
import { ProductoSku } from "../../domain/productos/productoSku";
import { ProductoCantidad } from "../../domain/productos/productoCantidad";
import { ProductoPrecio } from "../../domain/productos/productoPrecio";
import { ProductoVendedor } from "../../domain/productos/productoVendedor";

import { Producto } from "../../domain/productos/producto";

import { ProductosRepo } from "../../repos/productosRepo";
import { CreateProductoErrors } from "./CreateProductoErrors";

type Response = Either<
    | GenericAppError.UnexpectedError
    | CreateProductoErrors.ProductAlreadyExists
    | Result<any>,
    Result<void>
>;

export class CreateProductoUseCase
    implements UseCase<CreateProductoDTO, Promise<Response>> {
    private productoRepo: ProductosRepo;

    constructor(productoRepo: ProductosRepo) {
        this.productoRepo = productoRepo;
    }

    async execute(req: CreateProductoDTO): Promise<Response> {
        console.log(req);
        const nombreOrError = ProductoNombre.create(req.nombre);
        const skuOrError = ProductoSku.create(req.sku);
        const cantidadOrError = ProductoCantidad.create(req.cantidad);
        const precioOrError = ProductoPrecio.create(req.precio);
        const vendedorOrError = ProductoVendedor.create(req.vendedor);

        const combinedPropsResult = Result.combine([
            nombreOrError,
            skuOrError,
            cantidadOrError,
            precioOrError,
            vendedorOrError,
        ]);

        if (combinedPropsResult.isFailure) {
            return left(
                Result.fail<void>(combinedPropsResult.error)
            ) as Response;
        }

        const productoOrError = Producto.create({
            nombre: nombreOrError.getValue(),
            sku: skuOrError.getValue(),
            cantidad: cantidadOrError.getValue(),
            precio: precioOrError.getValue(),
            vendedor: vendedorOrError.getValue(),
        });

        if (productoOrError.isFailure) {
            return left(
                Result.fail<void>(combinedPropsResult.error)
            ) as Response;
        }

        const producto: Producto = productoOrError.getValue();

        const productoAlreadyExists = await this.productoRepo.exists(
            producto.sku
        );

        if (productoAlreadyExists) {
            return left(
                new CreateProductoErrors.ProductAlreadyExists(
                    producto.id.toString()
                )
            ) as Response;
        }

        try {
            await this.productoRepo.save(producto);
        } catch (err) {
            return left(new GenericAppError.UnexpectedError(err)) as Response;
        }

        return right(Result.ok<void>()) as Response;
    }
}
