import { Publisher, Subjects, TicketUpdatedEvent } from '@amdevcorp/ticketing-common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
} 