import { Mapper } from "../../../core/infra/Mapper";
import { Vendedor } from "../domain/vendedores/vendedor";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { VendedorEmail } from "../domain/vendedores/vendedorEmail";
import { VendedorPassword } from "../domain/vendedores/vendedorPassword";

export class VendedorMap extends Mapper<Vendedor> {
    public static toPersistence(vendedor: Vendedor): any {
        return {
            id: vendedor.id.toString(),
            email: vendedor.email.value,
            password: vendedor.password.value,
        };
    }

    public static toDomain(raw: any): Vendedor {
        const vendedorEmailOrError = VendedorEmail.create(raw.email);
        const vendedorPasswordOrError = VendedorPassword.create(raw.password);

        const vendedorOrError = Vendedor.create(
            {
                email: vendedorEmailOrError.getValue(),
                password: vendedorPasswordOrError.getValue(),
            },
            new UniqueEntityID(raw.id)
        );

        vendedorOrError.isFailure ? console.log(vendedorOrError.error) : "";

        return vendedorOrError.isSuccess ? vendedorOrError.getValue() : null;
    }
}
