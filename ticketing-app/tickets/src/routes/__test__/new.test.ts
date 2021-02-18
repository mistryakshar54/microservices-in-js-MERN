import request from 'supertest';
import { app } from '../../app';

it('returns an error if the user is not authenticated' , async() => {
    const resp = await request(app)
    .post('/api/tickets')
    .send({});
    expect(resp.status).toEqual(403);
})