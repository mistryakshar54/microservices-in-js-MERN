import mongoose from 'mongoose';
import { app } from './app';
import { OrderCancelledListner } from './events/listners/order-cancelled-listner';
import { OrderCreatedListner } from './events/listners/order-created-listner';
import { natsWrapper } from './nats-wrapper';
const bootStrap = async() => {

    if(!process.env.JWT_KEY){
        throw new Error("ENV Variables not confifugred!!");   
    }
    if(!process.env.MONGO_URL){
        throw new Error("MONGO_URL ENV Variable not confifugred!!");   
    }
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
        new OrderCancelledListner(natsWrapper.client).listen();

        await mongoose.connect( process.env.MONGO_URL , {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log("Connected to db");
        app.listen( 3000 , ()=> console.log('App listening on 3000!!!!'));
    }
    catch(err){
        console.log("Error connecting to mongo", err);
    }
}

bootStrap();