import { MockJobCreatedEvent } from "../events/mockJobCreatedEvent";
import { MockJobDeletedEvent } from "../events/mockJobDeletedEvent";
import { IHandle } from "../../../IHandle";
import { DomainEvents } from "../../../DomainEvents";

export class MockRegisterJob
    implements IHandle<MockJobCreatedEvent>, IHandle<MockJobDeletedEvent> {
    constructor() {}

    setupSubscriptions(): void {
        DomainEvents.register(
            this.handleJobCreatedEvent,
            MockJobCreatedEvent.name
        );
        DomainEvents.register(
            this.handleDeletedEvent,
            MockJobDeletedEvent.name
        );
    }

    handleJobCreatedEvent(event: MockJobCreatedEvent): void {
        console.log("A job was created!!!");
    }

    handleDeletedEvent(event: MockJobDeletedEvent): void {
        console.log("A job was deleted!!!");
    }
}
