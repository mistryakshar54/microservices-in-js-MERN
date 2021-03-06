import { randomInt } from 'crypto';
import nats from 'node-nats-streaming';

console.clear();

const client  = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

client.on('connect', () => {
    console.log('Publisher connected to NATS');
    const data = JSON.stringify({
        id : randomInt(999),
        title: 'concert',
        price : 30
    });
    client.publish('ticket:created', data , ()=>{
        console.log('Event published')
    })
})


process.on('SIGINT', () => client.close()  );
process.on('SIGTERM', () => client.close()  );