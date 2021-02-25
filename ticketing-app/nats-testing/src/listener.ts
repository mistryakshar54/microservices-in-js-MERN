import nats, {Message} from 'node-nats-streaming';

console.clear();

const listner = nats.connect('ticketing', '123', {
    url: 'http://localhost:4222'
});

listner.on('connect', () => {
    console.log('listner connected on NATS')
    const subscription = listner.subscribe('ticket:created');
    subscription.on('message', (msg : Message)=> {
        const data = msg.getData();
        if(typeof data === 'string'){
            console.log('Message received ', data)
        }
    })
})