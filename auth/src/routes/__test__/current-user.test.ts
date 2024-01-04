import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
  
  const cookie = await signin();// cookie session is contained under "Set-Cookie" header

  const response = await request(app)// manually make the followup request has the cookie along with it when use supertest because supertest doean't have the mechanics to handle cookie(unlike browser and postman)
    .get('/api/users/currentuser')
    .set("Cookie", cookie)//set() sets a new header"Cookie" to the request being made with the cookie got from initial signup response
    .send()//"get" request doesn't have object in it
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');//test result equals the expected result. test passes. otherwise fails
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);// general code for request completed

  expect(response.body.currentUser).toEqual(null);
});