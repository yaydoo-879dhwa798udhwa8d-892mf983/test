import { Entity } from "./Entity";
import { UniqueEntityID } from "./UniqueEntityID";
import { IDomainEvent } from "./events/IDomainEvent";

// MIX
import { DomainEvents } from "./events/DomainEvents";

export abstract class AggregateRoot<T> extends Entity<T> {
    private _domainEvents: IDomainEvent[] = [];
    get id(): UniqueEntityID {
        return this._id;
    }
    get domainEvents(): IDomainEvent[] {
        return this._domainEvents;
    }
    protected addDomainEvent(domainEvent: IDomainEvent): void {
        this._domainEvents.push(domainEvent);
        DomainEvents.markAggregateForDispatch(this);
        this.logDomainEventAdded(domainEvent);
    }
    public clearEvents(): void {
        this._domainEvents.splice(0, this.domainEvents.length);
    }
    private logDomainEventAdded(domainEvent: IDomainEvent): void {
        const thisClass = Reflect.getPrototypeOf(this);
        const domainEventClass = Reflect.getPrototypeOf(domainEvent);
        /* //Debbugger
        console.info(
            `[Domain Event Created]: ${thisClass.constructor.name} ===> ${domainEventClass.constructor.name}`
        ); */
    }
}