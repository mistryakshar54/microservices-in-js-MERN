import nats from 'node-nats-streaming';
import { Listner, Subjects } from '@amdevcorp/ticketing-common';

export interface TicketCreatedEvent {
    subject : Subjects.TicketCreated;
    data : {
        id : string;
        title : string;
        price : number;
        userId : string;
    }
}

export class TicketCreatedListner extends Listner<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroup = 'payments-service';
    onMessage(data: TicketCreatedEvent['data'] , msg: nats.Message): void {
        console.log('Event data', data);
        msg.ack();
    }
} 