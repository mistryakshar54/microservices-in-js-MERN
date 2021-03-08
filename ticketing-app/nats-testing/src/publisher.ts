import { randomInt } from 'crypto';
import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from '@amdevcorp/ticketing-common';

console.clear();

const client  = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

client.on('connect', async() => {
    console.log('Publisher connected to NATS');
    const data = {
        id : randomInt(999).toString(),
        title: 'concert',
        price : 30
    };
    const publisher = new TicketCreatedPublisher(client);
    await publisher.publish(data);
    console.log('Event published to ', publisher.subject);
})


process.on('SIGINT', () => client.close()  );
process.on('SIGTERM', () => client.close()  );