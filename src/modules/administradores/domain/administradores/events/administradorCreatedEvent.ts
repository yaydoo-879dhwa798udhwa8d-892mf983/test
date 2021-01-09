import { IDomainEvent } from "../../../../../core/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../../core/domain/UniqueEntityID";
//mix
import { Administrador } from "../administrador";

export class AdministradorCreatedEvent implements IDomainEvent {
    public dateTimeOccurred: Date;
    public vendedor: Administrador;

    constructor(vendedor: Administrador) {
        this.dateTimeOccurred = new Date();
        this.vendedor = vendedor;
    }

    getAggregateId(): UniqueEntityID {
        return this.vendedor.id;
    }
}
