import request from 'supertest';
import { app } from '../../app';

it('returns current user details if the user is logged in', async(done)=>{
    const signUpCookie = await global.getSignUpCookie('test@test.com','password');
    request(app)
    .get('/api/users/currentUser')
    .set('Cookie', signUpCookie)
    .expect(200)
    .end((err, res) => {
        if (err) {
            return done(err);
        }
        expect(res.body.currentUser).toBeDefined();
        expect(res.body.currentUser.email).toBe('test@test.com');
        return done();
    });
});