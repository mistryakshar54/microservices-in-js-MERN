import nats from 'node-nats-streaming';
import { Listner, Subjects, TicketCreatedEvent } from '@amdevcorp/ticketing-common';

export class TicketCreatedListner extends Listner<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroup = 'payments-service';
    onMessage(data: TicketCreatedEvent['data'] , msg: nats.Message): void {
        console.log('Event data', data);
        msg.ack();
    }
} 