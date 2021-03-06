import { Subjects } from './subjects';
import {Message, Stan} from 'node-nats-streaming';

interface Event {
    subject : Subjects;
    data : any;
}

export abstract class Listner< T extends Event>{
    abstract subject : T['subject'];
    abstract queueGroup : string;
    abstract onMessage(data : T['data'], msg : Message) : void;
    private client : Stan;
    protected ackWait = 5 * 1000;

    constructor(client : Stan){
        this.client = client;
    }

    subscriptionOptions(){
        return this.client.subscriptionOptions()
                .setDeliverAllAvailable()
                .setDeliverAllAvailable()
                .setAckWait(this.ackWait)
                .setManualAckMode(true)
                .setDurableName(this.queueGroup);
    }
    listen(){
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroup,
            this.subscriptionOptions()
        )
        subscription.on('message', (msg : Message) => {
            console.log(`Mesage Recieved from ${this.subject} / ${this.queueGroup}`);
            const parsedMessage = this.parseMessage(msg);
            this.onMessage(parsedMessage, msg );
        })
    }
    parseMessage (msg : Message){
        const data = msg.getData();
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf-8'));
    }
}