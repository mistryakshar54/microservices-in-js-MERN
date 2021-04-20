import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/Orders';
import mongoose from 'mongoose';
import { OrderStatus } from '@amdevcorp/ticketing-common';

jest.mock('../../nats-wrapper.ts');

it('returns an error if the user is not authenticated' , async() => {
    const resp = await request(app)
    .post('/api/payments')
    .send({});
    expect(resp.status).toEqual(403);
})

it('returns an error if the order doesnt exist' , async() => {
    const cookies = global.getSignUpCookie();
    const resp = await request(app)
    .post('/api/payments')
    .set('Cookie', cookies)
    .send({ 
        token : 'ABC', 
        orderId : mongoose.Types.ObjectId().toHexString()
    });
    expect(resp.status).toEqual(404);
})

it('returns bad request error when the request body is invalid' , async() => {
    const cookies = global.getSignUpCookie();
    await request(app)
    .post('/api/payments')
    .set('Cookie', cookies)
    .send({})
    .expect(400);
    
    await request(app)
    .post('/api/payments')
    .set('Cookie', cookies)
    .send({
        token : ''
    })
    .expect(400);
    
    await request(app)
    .post('/api/payments')
    .set('Cookie', cookies)
    .send({ orderId : ''})
    .expect(400);
})

it('returns 201 if order is correct' , async() => {
    const userID = mongoose.Types.ObjectId().toHexString();
    const cookies = global.getSignUpCookie(userID, 'test@test.com');
    const order = await Order.buildOrder({
        id : mongoose.Types.ObjectId().toHexString(),
        status : OrderStatus.CREATED,
        version : 0,
        price : 250,
        userId : userID,
    })
    await order.save();

    const resp = await request(app)
    .post('/api/payments')
    .set('Cookie', cookies)
    .send({ 
        token : 'ABC', 
        orderId : order.id
    });
    expect(resp.status).toEqual(201);
})

it('returns an error if the order is cancelled' , async() => {
    const userID = mongoose.Types.ObjectId().toHexString();
    const cookies = global.getSignUpCookie(userID, 'test@test.com');
    const order = await Order.buildOrder({
        id : mongoose.Types.ObjectId().toHexString(),
        status : OrderStatus.CANCELLED,
        version : 0,
        price : 250,
        userId : userID,
    })
    await order.save();

    const resp = await request(app)
    .post('/api/payments')
    .set('Cookie', cookies)
    .send({ 
        token : 'ABC', 
        orderId : order.id
    });
    expect(resp.status).toEqual(400);
})