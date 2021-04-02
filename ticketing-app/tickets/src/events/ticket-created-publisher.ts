import { Publisher, Subjects, TicketCreatedEvent } from '@amdevcorp/ticketing-common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
} 