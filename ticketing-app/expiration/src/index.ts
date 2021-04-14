import { OrderCreatedListner } from './events/listners/order-created-listner';
import { natsWrapper } from './nats-wrapper';
const bootStrap = async() => {

    if(!process.env.NATS_URL){
        throw new Error("NATS_URL ENV Variable not confifugred!!");   
    }
    if(!process.env.NATS_CLUSTER_ID){
        throw new Error("NATS_CLUSTER_ID ENV Variable not confifugred!!");   
    }
    if(!process.env.NATS_CLIENT_ID){
        throw new Error("NATS_CLIENT_ID ENV Variable not confifugred!!");   
    }
    try{
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID,process.env.NATS_CLIENT_ID,process.env.NATS_URL);
        natsWrapper.client.on('close', ()=> {
            console.log("NATS Connection closing");
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());
        new OrderCreatedListner(natsWrapper.client).listen();
        
    }
    catch(err){
        console.log("Error connecting to mongo", err);
    }
}

bootStrap();