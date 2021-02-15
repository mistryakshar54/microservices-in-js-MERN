import request from 'supertest';
import { app } from '../../app';

it('returns 200 on successfull signout', async(done)=>{
    request(app)
        .post('/api/users/auth/signout')
        .send({})
        .expect(200)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.message).toBe('success');
            return done();
        });
});