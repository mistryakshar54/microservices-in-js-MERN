import {Message} from 'node-nats-streaming';
import { Listner, Subjects, OrderCreatedEvent, NotFoundError } from '@amdevcorp/ticketing-common';
import { TicketServiceQueueGroup } from './queue-group-name';
import { Ticket } from '../../models/Tickets';
import { TicketUpdatedPublisher } from '../ticket-update-publisher';

export class OrderCreatedListner extends Listner<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroup = TicketServiceQueueGroup;
    async onMessage(data: OrderCreatedEvent['data'] , msg: Message): Promise<void> {
        console.log('Order Service : OrderCreatedListner', data);
        const ticket = await Ticket.findById(data.ticket.id);
        if(!ticket){
            throw new NotFoundError('Ticket with ID not found');
        }
        ticket.set({ orderId: data.id });
        await ticket.save();
        new TicketUpdatedPublisher(this.client).publish({
            id : ticket.id,
            price : ticket.price,
            title : ticket.title,
            orderId : ticket.orderId,
            version : ticket.version,
            userId : ticket.userId
        });
        msg.ack();
    }
} 