import { Publisher, Subjects } from '@amdevcorp/ticketing-common';
import { TicketCreatedEvent } from './ticket-created-listner';

export class TicketUpdatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
} 