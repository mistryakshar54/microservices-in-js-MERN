import { Publisher, Subjects, TicketCreatedEvent } from '@amdevcorp/ticketing-common';

export class TicketUpdatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
} 