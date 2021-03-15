import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/Tickets';
jest.mock('../../nats-wrapper.ts');

const createOrder = async (title : string , price : number, userId: string) => {
    const cookies = global.getSignUpCookie(userId);
    const ticket = Ticket.buildTicket({ title , price });
    await ticket.save();
    
    const resp = await request(app)
    .post('/api/orders')
    .set('Cookie', cookies)
    .send({ ticketId : ticket.id })
    .expect(201);
    return resp.body;
}

it('returns list of tickets' , async() => {
    
    await createOrder('Ticket 1', 100 , '101');
    await createOrder('Ticket 2', 200, '102');
    await createOrder('Ticket 3', 400, '101');
    let cookies = global.getSignUpCookie('101');
    let resp = await request(app)
    .get('/api/orders')
    .set('Cookie', cookies);

    expect(resp.status).toEqual(200);
    expect(resp.body.message).toEqual('success');
    expect(resp.body.data).toHaveLength(2);
    
    cookies = global.getSignUpCookie('102');
    resp = await request(app)
    .get('/api/orders')
    .set('Cookie', cookies);

    expect(resp.status).toEqual(200);
    expect(resp.body.message).toEqual('success');
    expect(resp.body.data).toHaveLength(1);
})

it('returns an error if the specified order does not exist' , async() => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const resp = await request(app)
    .get(`/api/orders/${id}`)

    expect(resp.status).toEqual(404);
})

it('returns an error if the order id is invalid' , async() => {
    const resp = await request(app)
    .get(`/api/orders/lol`)

    expect(resp.status).toEqual(400);
})

it('returns successfully requested order is found' , async() => {
    
    const cookies = global.getSignUpCookie('101');
    const { data : order} = await createOrder('Sample Ticket' , 350 , '101');
    await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', cookies)
    .expect(200);
})
