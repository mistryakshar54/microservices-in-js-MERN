import {Message} from 'node-nats-streaming';
import { Listner, Subjects, OrderCreatedEvent, NotFoundError } from '@amdevcorp/ticketing-common';
import { PaymentServiceQueueGroup } from './queue-group-name';
import { Order } from '../../models/Orders';

export class OrderCreatedListner extends Listner<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroup = PaymentServiceQueueGroup;
    async onMessage(data: OrderCreatedEvent['data'] , msg: Message): Promise<void> {
        console.log('Payment Service : OrderCreatedListner', data);
        const order = Order.buildOrder({
            id : data.id,
            price: data.ticket.price,
            status : data.status,
            userId : data.userId,
            version : data.version
        })
        await order.save();
        console.log("Created order: ", order);
        msg.ack();
    }
} 