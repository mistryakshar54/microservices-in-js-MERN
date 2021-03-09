import { Publisher, Subjects } from '@amdevcorp/ticketing-common';
import { TicketCreatedEvent } from './ticket-created-listner';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
} 