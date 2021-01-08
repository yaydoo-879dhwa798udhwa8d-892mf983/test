import { IDomainEvent } from "../../../../../core/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../../core/domain/UniqueEntityID";
//mix
import { Vendedor } from "../vendedor";

export class VendedorCreatedEvent implements IDomainEvent {
    public dateTimeOccurred: Date;
    public vendedor: Vendedor;

    constructor(vendedor: Vendedor) {
        this.dateTimeOccurred = new Date();
        this.vendedor = vendedor;
    }

    getAggregateId(): UniqueEntityID {
        return this.vendedor.id;
    }
}
