import { OrderCancelledPublisher } from './../order-cancelled-publisher';
import {Message} from 'node-nats-streaming';
import { Listner, Subjects, OrderStatus, ExiprationCompleteEvent } from '@amdevcorp/ticketing-common';
import { OrderServiceQueueGroup } from './queue-group-name';
import { Order } from '../../models/Orders';

export class ExiprationCompleteListner extends Listner<ExiprationCompleteEvent> {
    readonly subject = Subjects.ExiprationComplete;
    queueGroup = OrderServiceQueueGroup;
    async onMessage(data: ExiprationCompleteEvent['data'] , msg: Message): Promise<void> {
        console.log('Order Service : ExiprationCompleteListner', data);
        const {orderId } = data;
        const order = await Order.findById(orderId);

        if(!order){
            throw new Error('Order not found');
        }
        
        if(order.status !== OrderStatus.COMPLETE){
            order.set({
                status : OrderStatus.CANCELLED
            })
            
            await order.save();
            await new OrderCancelledPublisher( this.client ).publish({
                id : order.id,
                ticket : {
                  id : order.ticket.toString()
                }
            })
        }
        
        msg.ack();
    }
} 