import { IDomainEvent } from "../../../../../core/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../../core/domain/UniqueEntityID";
//mix
import { Producto } from "../producto";

export class ProductoCreatedEvent implements IDomainEvent {
    public dateTimeOccurred: Date;
    public vendedor: Producto;

    constructor(vendedor: Producto) {
        this.dateTimeOccurred = new Date();
        this.vendedor = vendedor;
    }

    getAggregateId(): UniqueEntityID {
        return this.vendedor.id;
    }
}
