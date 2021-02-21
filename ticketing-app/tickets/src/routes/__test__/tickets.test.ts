import request from 'supertest';
import { app } from '../../app';

it('returns an error if the user is not authenticated' , async() => {
    const resp = await request(app)
    .post('/api/tickets')
    .send({});
    expect(resp.status).toEqual(403);
})

it('returns successfully when the user is autenticated' , async() => {
    const cookies = global.getSignUpCookie();
    const resp = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookies)
    .send({});
    expect(resp.status).toEqual(200);
})