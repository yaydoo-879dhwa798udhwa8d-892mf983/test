import { BaseController } from "../../../../core/infra/BaseController";
import { CreateProductoUseCase } from "./CreateProductoUseCase";
import { CreateProductoDTO } from "./CreateProductoDTO";
import { CreateProductoErrors } from "./CreateProductoErrors";
import * as yup from "yup";

export class CreateProductoController extends BaseController {
    private useCase: CreateProductoUseCase;

    constructor(useCase: CreateProductoUseCase) {
        super();
        this.useCase = useCase;
    }
    validateNombre(nombre: string): Promise<boolean> {
        let schema = yup.object().shape({
            nombre: yup.string(),
        });
        return schema.isValid({ nombre: nombre });
    }
    validateSku(sku: string): Promise<boolean> {
        let schema = yup.object().shape({
            sku: yup.string(),
        });
        return schema.isValid({ sku: sku });
    }
    validateCantidad(cantidad: string): Promise<boolean> {
        let schema = yup.object().shape({
            cantidad: yup.number(),
        });
        return schema.isValid({ cantidad: cantidad });
    }
    validatePrecio(precio: string): Promise<boolean> {
        let schema = yup.object().shape({
            precio: yup.number(),
        });
        return schema.isValid({ precio: precio });
    }

    async validateBody(js: {}) {
        if (!js["nombre"]) {
            this.unEntity("Field 'nombre' required");
        }
        if (!js["sku"]) {
            this.unEntity("Field 'sku' required");
        }
        if (!js["cantidad"]) {
            this.unEntity("Field 'cantidad' required");
        }
        if (!js["precio"]) {
            this.unEntity("Field 'precio' required");
        }
        let result;
        result = await this.validateNombre(js["nombre"]);
        if (!result) {
            this.unEntity("Invalid nombre format");
        }
        result = await this.validateSku(js["sku"]);
        if (!result) {
            this.unEntity("Invalid nombre format");
        }
        result = await this.validateCantidad(js["cantidad"]);
        if (!result) {
            this.unEntity("Invalid nombre precio");
        }
    }

    async executeTEMP(): Promise<any> {
        await this.validateBody(this.ctx.request.body);
        const dto: CreateProductoDTO = this.ctx.request
            .body as CreateProductoDTO;
        dto.vendedor = this.ctx.headers["id"];
        try {
            const result = await this.useCase.execute(dto);

            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case CreateProductoErrors.ProductAlreadyExists:
                        this.conflict(error.errorValue().message);
                        break;
                    default:
                        this.fail(error.errorValue().message);
                        break;
                }
            } else {
                this.created();
            }
        } catch (err) {
            this.fail(err);
        }
    }
}
