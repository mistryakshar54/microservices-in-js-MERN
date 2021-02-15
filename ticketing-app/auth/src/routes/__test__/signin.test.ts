
import request from 'supertest';
import { app } from '../../app';

it('returns 201 on successfull signin', async(done)=>{
    await request(app)
        .post('/api/users/auth/signup')
        .send({
            email : 'test@test.com',
            password: 'password'
        });
    request(app)
        .post('/api/users/auth/signin')
        .send({
            email : 'test@test.com',
            password: 'password'
        })
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.header['set-cookie']).toBeDefined();
            expect(res.body.message).toEqual('success');
            return done();
        });
});

it('returns error for invalid creds', async(done)=>{
    request(app)
        .post('/api/users/auth/signin')
        .send({
            email : 'test@test.com',
            password: 'password'
        })
        .expect(400)
        .end((err, res) => {
        if (err) {
            return done(err);
        }
        expect(res.body).toStrictEqual([{"message": "Invalid Credentails"}]);
        return done();
    });
});