// write test with supertest lib
//one .test.ts is one test suite
// run test in terminal with "npm run test". try restart the test suite when encounter unexplained issues
// first test valid email and password, then invalid email and password
import request from 'supertest';// lib to provide fake requests for test purposes
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {//test statement, make the test function async so we can add potential await in the future
  return request(app)//supertest generates a fake post request with given information to the given rout handler
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);// assertion compare the actual status and expect status code
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'password'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'p'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com'
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'alskjdf'
    })
    .expect(400);
});
it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {// test if the response contains a header of "Set-Cookie" when signup successfully
  const response = await request(app)// the function chain returns response
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();//response.get() is a built-in method to return headers of the response
});//"Set_Cookie" header describe the status of the cookie session object in the response
