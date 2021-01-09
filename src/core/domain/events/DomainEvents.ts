import { IDomainEvent } from "./IDomainEvent";
import { AggregateRoot } from "../AggregateRoot";
import { UniqueEntityID } from "../UniqueEntityID";

export class DomainEvents {
    private static handlersMap = {};
    private static markedAggregates: AggregateRoot<any>[] = [];

    /**
     * @method markAggregateForDispatch
     * @static
     * @desc Called by aggregate root objects that have created domain
     * events to eventually be dispatched when the infrastructure commits
     * the unit of work.
     */

    public static markAggregateForDispatch(
        aggregate: AggregateRoot<any>
    ): void {
        const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

        if (!aggregateFound) {
            this.markedAggregates.push(aggregate);
        }
    }

    /**
     * @method dispatchAggregateEvents
     * @static
     * @desc
     */
    private static dispatchAggregateEvents(
        aggregate: AggregateRoot<any>
    ): void {
        aggregate.domainEvents.forEach((event: IDomainEvent) =>
            this.dispatch(event)
        );
    }
    /**
     * @method removeAggregateFromMarkedDispatchList
     * @static
     * @desc
     */
    private static removeAggregateFromMarkedDispatchList(
        aggregate: AggregateRoot<any>
    ): void {
        const index = this.markedAggregates.findIndex((a) =>
            a.equals(aggregate)
        );
        this.markedAggregates.splice(index, 1);
    }
    /**
     * @method findMarkedAggregateByID
     * @static
     * @desc
     */
    private static findMarkedAggregateByID(
        id: UniqueEntityID
    ): AggregateRoot<any> {
        let found: AggregateRoot<any> = null;
        for (let aggregate of this.markedAggregates) {
            if (aggregate.id.equals(id)) {
                found = aggregate;
            }
        }

        return found;
    }
    /**
     * @method dispatchEventsForAggregate
     * @static
     * @desc
     */
    public static dispatchEventsForAggregate(id: UniqueEntityID): void {
        const aggregate = this.findMarkedAggregateByID(id);

        if (aggregate) {
            this.dispatchAggregateEvents(aggregate);
            aggregate.clearEvents();
            this.removeAggregateFromMarkedDispatchList(aggregate);
        }
    }
    /**
     * @method register
     * @static
     * @desc
     */
    public static register(
        callback: (event: IDomainEvent) => void,
        eventClassName: string
    ): void {
        if (!this.handlersMap.hasOwnProperty(eventClassName)) {
            this.handlersMap[eventClassName] = [];
        }
        this.handlersMap[eventClassName].push(callback);
    }
    /**
     * @method clearHandlers
     * @static
     * @desc
     */
    public static clearHandlers(): void {
        this.handlersMap = {};
    }
    /**
     * @method clearMarkedAggregates
     * @static
     * @desc
     */
    public static clearMarkedAggregates(): void {
        this.markedAggregates = [];
    }
    /**
     * @method dispatch
     * @static
     * @desc
     */
    private static dispatch(event: IDomainEvent): void {
        const eventClassName: string = event.constructor.name;

        if (this.handlersMap.hasOwnProperty(eventClassName)) {
            const handlers: any[] = this.handlersMap[eventClassName];
            for (let handler of handlers) {
                handler(event);
            }
        }
    }
}
