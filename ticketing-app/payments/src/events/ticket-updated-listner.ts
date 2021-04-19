import nats from 'node-nats-streaming';
import { Listner, Subjects, TicketUpdatedEvent } from '@amdevcorp/ticketing-common';

export class TicketUpdatedListner extends Listner<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
    queueGroup = 'payments-service';
    onMessage(data: TicketUpdatedEvent['data'] , msg: nats.Message): void {
        console.log('Event data', data);
        msg.ack();
    }
} 