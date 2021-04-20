import nats from 'node-nats-streaming';
import { Listner, Subjects, OrderCompleteEvent, NotFoundError, OrderStatus } from '@amdevcorp/ticketing-common';
import { Order } from '../../models/Orders';

export class OrderCompletedListner extends Listner<OrderCompleteEvent> {
    readonly subject = Subjects.OrderCompleted;
    queueGroup = 'payments-service';
    async onMessage(data: OrderCompleteEvent['data'] , msg: nats.Message): Promise<void> {
        console.log('Order Completed Listner', data);
        const order = await Order.findById(data.orderId);
        if(!order){
            throw new NotFoundError(`Order with Id: ${data.orderId} does not exist`);
        }
        
        order.set({status : OrderStatus.COMPLETE});
        await order.save();

        msg.ack();
    }
} 