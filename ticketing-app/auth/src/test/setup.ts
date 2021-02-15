import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

declare global { 
    namespace NodeJS {
        interface Global {
            getSignUpCookie(email : string , pwd : string) : Promise<string[]>;
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

global.getSignUpCookie = async( email : string, pwd : string ) => {
    const response = await request(app)
    .post('/api/users/auth/signup')
    .send({ email, password: pwd})
    .expect(201);
    return response.get('Set-Cookie');
}