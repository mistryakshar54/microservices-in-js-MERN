import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/Tickets';

jest.mock('../../nats-wrapper.ts');

it('returns an error if the user is not authenticated' , async() => {
    const resp = await request(app)
    .post('/api/tickets')
    .send({});
    expect(resp.status).toEqual(403);
})

it('returns bad request error when the request body is invalid' , async() => {
    const cookies = global.getSignUpCookie();
    await request(app)
    .post('/api/tickets')
    .set('Cookie', cookies)
    .send({
        title : 'lol'
    })
    .expect(400);
    
    await request(app)
    .post('/api/tickets')
    .set('Cookie', cookies)
    .send({
        price : 150
    })
    .expect(400);
    
    await request(app)
    .post('/api/tickets')
    .set('Cookie', cookies)
    .send({})
    .expect(400);
    
    await request(app)
    .post('/api/tickets')
    .set('Cookie', cookies)
    .send({ title : '', price : 150})
    .expect(400);
})

it('returns successfully when the request body is correct' , async() => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);
    
    const cookies = global.getSignUpCookie();
    const resp = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookies)
    .send({
        title : 'lol',
        price : 200.50
    });
    expect(resp.status).toEqual(201);
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
})