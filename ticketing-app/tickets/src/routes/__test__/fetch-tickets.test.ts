import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns an error if the specified ticket does not exist' , async() => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const resp = await request(app)
    .get(`/api/tickets/${id}`)

    expect(resp.status).toEqual(404);
})

it('returns an error if the ticket id is invalid' , async() => {
    const resp = await request(app)
    .get(`/api/tickets/lol`)

    expect(resp.status).toEqual(400);
})

it('returns successfully requested ticket is found' , async() => {
    
    const cookies = global.getSignUpCookie();
    const createTicketResp = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookies)
    .send({
        title : 'Sample Ticket 1',
        price : 200.50
    });
    expect(createTicketResp.status).toEqual(201);
    const createdTicket = createTicketResp.body.data;
    
    const resp = await request(app)
    .get(`/api/tickets/${createdTicket.id}`)

    expect(resp.status).toEqual(200);
    expect(resp.body.message).toEqual('success');
    expect(resp.body.data).toEqual(createdTicket);
})