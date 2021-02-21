import jwt from 'jsonwebtoken';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

declare global { 
    namespace NodeJS {
        interface Global {
            getSignUpCookie() : string[];
        }
    }
}

let mongo : any;
beforeAll( async() => {
    process.env.JWT_KEY = 'lol';
    mongo = new MongoMemoryServer();
    const connUrl = await mongo.getUri();

    await mongoose.connect( connUrl , {
        useNewUrlParser : true,
        useUnifiedTopology: true
    } )
})

beforeEach( async () => {
    const collections = await mongoose.connection.db.collections();
    for( let coll of collections ){
        await coll.deleteMany({});
    }
})

afterAll( async()=>{
    await mongo.stop();
    await mongoose.connection.close();
} )

global.getSignUpCookie = () => {
    const jwtToken = jwt.sign({ id: '101', email: 'test@test.com' }, process.env.JWT_KEY!);
    const sessionJson = JSON.stringify({ jwt : jwtToken });
    return [`express:sess=${Buffer.from(sessionJson).toString('base64')}`];
}