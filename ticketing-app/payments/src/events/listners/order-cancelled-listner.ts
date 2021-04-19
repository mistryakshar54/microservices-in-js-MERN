import {Message} from 'node-nats-streaming';
import { Listner, Subjects, OrderCancelledEvent, NotFoundError, OrderStatus } from '@amdevcorp/ticketing-common';
import { PaymentServiceQueueGroup } from './queue-group-name';
import { Order } from '../../models/Orders';

export class OrderCancelledListner extends Listner<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
    queueGroup = PaymentServiceQueueGroup;
    async onMessage(data: OrderCancelledEvent['data'] , msg: Message): Promise<void> {
        console.log('Payment Service : OrderCancelledListner', data);
        const order = await Order.findById(data.id);
        if(!order){
            throw new NotFoundError('Order with ID not found');
        }
        order.set({ status: OrderStatus.CANCELLED });
        await order.save();
        
        msg.ack();
    }
} 