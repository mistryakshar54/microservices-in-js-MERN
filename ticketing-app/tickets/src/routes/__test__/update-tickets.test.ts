import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/Tickets';
import mongoose from 'mongoose';
jest.mock('../../nats-wrapper.ts');

it('returns an error if the user is not authenticated' , async() => {
    const id = new mongoose.Types.ObjectId().toHexString();

    const resp = await request(app)
    .put(`/api/tickets/${id}`)
    .send({title : 'Samp1', price : 200});
    expect(resp.status).toEqual(403);
})

it('returns a 404 error if the provided id is incorrect' , async() => {
    const cookies = global.getSignUpCookie();

    const id = new mongoose.Types.ObjectId().toHexString();
    const resp = await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', cookies)
    .send({title : 'sample11', price : 105});
    expect(resp.status).toEqual(404);
})

it('returns a 403 error if the user doesnt own the ticket' , async() => {
    let cookies = global.getSignUpCookie('201', 'a@a.com');
    const ticketResp = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookies)
    .send({title : 'sample11', price : 105});

    cookies = global.getSignUpCookie();
    const resp = await request(app)
    .put(`/api/tickets/${ticketResp.body.data.id}`)
    .set('Cookie', cookies)
    .send({title : 'sample11', price : 105});
    expect(resp.status).toEqual(403);
})


it('returns bad request error when the request body is invalid' , async() => {
    let cookies = global.getSignUpCookie();
    const ticketResp = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookies)
    .send({title : 'sample11', price : 105});

    const resp = await request(app)
    .put(`/api/tickets/${ticketResp.body.data.id}`)
    .set('Cookie', cookies)
    .send({price : 105})
    .expect(400);

    await request(app)
    .put(`/api/tickets/${ticketResp.body.data.id}`)
    .set('Cookie', cookies)
    .send({price : 105})
    .expect(400);
})

it('returns successfully when the request body is correct' , async() => {
    let cookies = global.getSignUpCookie();
    const ticketResp = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookies)
    .send({title : 'sample11', price : 105});
    expect(ticketResp.status).toEqual(201);

    const putReq = await request(app)
    .put(`/api/tickets/${ticketResp.body.data.id}`)
    .set('Cookie', cookies)
    .send({title : 'sampleAks', price : 200})
    .expect(200);
    
    const resp = await request(app)
    .get(`/api/tickets/${ticketResp.body.data.id}`)

    expect(resp.status).toEqual(200);
    expect(resp.body.data.title).toEqual('sampleAks');
})