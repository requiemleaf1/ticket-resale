import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signout')
    .send({})// has to have send an object because this is a post request
    .expect(200);

  expect(response.get('Set-Cookie')[0]).toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );// This is what "Set_Cookie" header contains if the cookie session is cleared/logged out
});
