import {Message} from 'node-nats-streaming';
import { Listner, Subjects, OrderCreatedEvent, NotFoundError } from '@amdevcorp/ticketing-common';
import { TicketServiceQueueGroup } from './queue-group-name';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListner extends Listner<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroup = TicketServiceQueueGroup;
    async onMessage(data: OrderCreatedEvent['data'] , msg: Message): Promise<void> {
        console.log('Expiration Service : OrderCreatedListner', data);
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        await expirationQueue.add({ orderId :  data.id }, {
            delay
        })
        msg.ack();
    }
} 