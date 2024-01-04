// set up test environment, including mongo memory server
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {// declare "signin" as a function in global scope that returns a promise which resolves with value of string[]
  var signin: () => Promise<string[]>;// so it can be called in different services without having to be imported to diffirent files
}

let mongo: any;
beforeAll(async () => {//hook function.function inside run before all the tests execute
  process.env.JWT_KEY = "asdf"//becuase the envi was created only in index.ts(where the startup code is)but not in the test environment, so it should slaso be created here
  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();// the Uri used to connect to the mongo server in memory

  await mongoose.connect(mongoUri, {});// use mongoose to connect to the mongo server uri
});

beforeEach(async () => {//run before each of the tests
  const collections = await mongoose.connection.db.collections();// remove all the data in the mongo server before each test 

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {// after all the test done, stop mongo server and close mongoose connection
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {// implement the global signin function as a helper function
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
