import { body } from 'express-validator';
import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/Tickets';
import { Order } from '../../models/Orders';
import { OrderStatus } from '@amdevcorp/ticketing-common';

jest.mock('../../nats-wrapper.ts');

it('returns an error if the ticket doesnt exist' , async() => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const cookies = global.getSignUpCookie();
    await request(app)
    .post('/api/orders')
    .set('Cookie', cookies)
    .send({ ticketId :id  })
    .expect(404);
   
});

it('returns error if ticket has already been reserved' , async() => {
    const ticket = Ticket.buildTicket({ title : 'Sample Title', price : 200 });
    await ticket.save();

    const order = Order.buildOrder({
        expiresAt : new Date(),
        ticket,
        userId : 'SampleId',
        status : OrderStatus.CREATED
    })
    await order.save();

    const cookies = global.getSignUpCookie();
    await request(app)
    .post('/api/orders')
    .set('Cookie', cookies)
    .send({ ticketId : ticket.id })
    .expect(400);
})

it('returns successfully if everything is ok' , async() => {
    const ticket = Ticket.buildTicket({ title : 'Sample Title', price : 200 });
    await ticket.save();

    const cookies = global.getSignUpCookie();
    await request(app)
    .post('/api/orders')
    .set('Cookie', cookies)
    .send({ ticketId : ticket.id })
    .expect(201);
})

it.todo('emits an order');