import nats from 'node-nats-streaming';
import { Listner, NotFoundError, Subjects, TicketUpdatedEvent } from '@amdevcorp/ticketing-common';
import { OrderServiceQueueGroup } from './queue-group-name';
import { Ticket } from '../../models/Tickets';

export class TicketUpdatedListner extends Listner<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
    queueGroup = OrderServiceQueueGroup;
    async onMessage(data: TicketUpdatedEvent['data'] , msg: nats.Message): Promise<void> {
        console.log('Event data', data);
        const ticket =  await Ticket.findById(data.id);
        if(!ticket){
            throw new NotFoundError(`Ticket id : ${data.id} not found`);
        }
        const {title , price } = data;
        ticket.set({ title , price });
        await ticket.save();
        msg.ack();
    }
} 