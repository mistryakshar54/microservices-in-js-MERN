import nats, {Message, Stan} from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListner } from './events/ticket-created-listner';
console.clear();

const listner = nats.connect('ticketing', randomBytes(5).toString('hex'), {
    url: 'http://localhost:4222'
});

listner.on('connect', () => {
    console.log('listner connected on NATS'); 
    new TicketCreatedListner(listner).listen();
})


process.on('SIGINT', () => listner.close()  );
process.on('SIGTERM', () => listner.close()  );




