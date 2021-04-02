import nats from 'node-nats-streaming';
import { Listner, Subjects, OrderCreatedEvent } from '@amdevcorp/ticketing-common';

export class OrderCreatedListner extends Listner<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroup = 'payments-service';
    onMessage(data: OrderCreatedEvent['data'] , msg: nats.Message): void {
        console.log('Event data', data);
        msg.ack();
    }
} 