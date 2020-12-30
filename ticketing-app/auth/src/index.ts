import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {authRoutes} from './routes/index';
import { errorHandler } from './middleware/errorHandler';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const MONGO_URL = "mongodb://auth-mongo-srv:27017/users";

const app = express();
app.set('trust proxy', true); //Make sure express is behind ingress-nginx and thus allows the flow
app.use(json());
app.use( cookieSession({ signed: false, httpOnly: true, }) );


app.get('/api/users/currentUser' ,( req , res ) => res.status(200).json({message : "This is the current user"}));
app.use('/api/users/auth' ,authRoutes);

app.use(errorHandler);

const bootStrap = async() => {

    if(!process.env.JWT_KEY){
        throw new Error("ENV Variables not confifugred!!");   
    }
    try{
        await mongoose.connect( MONGO_URL , {
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