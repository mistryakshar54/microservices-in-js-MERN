import { ExpirationCompletePublisher } from './../events/expiration-complete-publisher';
import  Queue from 'bull';
import { natsWrapper } from '../nats-wrapper';

interface Payload {
    orderId : string;
}

const expirationQueue = new Queue<Payload>('order:expiration',{
    redis:{
        host : process.env.REDIS_HOST
    }
});


expirationQueue.process( async( job ) => {
    console.log("Publish job data", job.data.orderId);
    await new ExpirationCompletePublisher(natsWrapper.client).publish({
        orderId : job.data.orderId
    })
});

export {expirationQueue};