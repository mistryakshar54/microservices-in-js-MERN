import mongoose from 'mongoose';
import { app } from './app';
import { natsClient } from './nats-wrapper';
const bootStrap = async() => {

    if(!process.env.JWT_KEY){
        throw new Error("ENV Variables not confifugred!!");   
    }
    if(!process.env.MONGO_URL){
        throw new Error("MONGO_URL ENV Variable not confifugred!!");   
    }
    try{
        await natsClient.connect('ticketing','aks','http://nats-srv:4222');
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