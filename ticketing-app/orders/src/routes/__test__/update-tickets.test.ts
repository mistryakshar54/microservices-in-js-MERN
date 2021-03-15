import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/Tickets';
import mongoose from 'mongoose';
jest.mock('../../nats-wrapper.ts');

it('returns an error if the user is not authenticated' , async() => {
    const id = new mongoose.Types.ObjectId().toHexString();

    const resp = await request(app)
    .delete(`/api/orders/${id}`)
    expect(resp.status).toEqual(403);
})

it('returns a 404 error if the provided id is incorrect' , async() => {
    const cookies = global.getSignUpCookie();

    const id = new mongoose.Types.ObjectId().toHexString();
    const resp = await request(app)
    .delete(`/api/orders/${id}`)
    .set('Cookie', cookies)
    expect(resp.status).toEqual(404);
})

it('returns a 403 error if the user doesnt own the ticket' , async() => {
    const ticket = Ticket.buildTicket({ title : 'Sample Title', price : 200 });
    await ticket.save();

    let cookies = global.getSignUpCookie();
    const orderResp = await request(app)
    .post('/api/orders')
    .set('Cookie', cookies)
    .send({ ticketId : ticket.id })
    .expect(201);
    
    cookies = global.getSignUpCookie('102');
    const resp = await request(app)
    .delete(`/api/orders/${orderResp.body.data.id}`)
    .set('Cookie', cookies)
    expect(resp.status).toEqual(403);
})

it('returns successfully when the request body is correct' , async() => {
    const ticket = Ticket.buildTicket({ title : 'Sample Title', price : 200 });
    await ticket.save();

    let cookies = global.getSignUpCookie('101');
    const orderResp = await request(app)
    .post('/api/orders')
    .set('Cookie', cookies)
    .send({ ticketId : ticket.id })
    .expect(201);
    
    const resp = await request(app)
    .delete(`/api/orders/${orderResp.body.data.id}`)
    .set('Cookie', cookies)
    expect(resp.status).toEqual(204);
})