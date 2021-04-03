import {Message} from 'node-nats-streaming';
import { Listner, Subjects, TicketCreatedEvent } from '@amdevcorp/ticketing-common';
import { OrderServiceQueueGroup } from './queue-group-name';
import { Ticket } from '../../models/Tickets';

export class TicketCreatedListner extends Listner<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroup = OrderServiceQueueGroup;
    async onMessage(data: TicketCreatedEvent['data'] , msg: Message): Promise<void> {
        console.log('Event data', data);
        const {id, title, price } = data;
        const ticket =  Ticket.buildTicket({
            id,
            title,
            price
        })
        await ticket.save();
        msg.ack();
    }
} 