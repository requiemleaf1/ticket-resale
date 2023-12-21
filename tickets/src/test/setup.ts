// set up test environment, including mongo memory server
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {// declare "signin" as a function in global scope that returns a promise which resolves with value of string[]
  var signin: () => string[];// so it can be called in different services without having to be imported to diffirent files
}//means this var is a function and returns an array of strings

jest.mock("../nats-wrapper");//redirect to the file with the same name in __mock__folder

let mongo: any;
beforeAll(async () => {//hook function.function inside run before all the tests execute
  process.env.JWT_KEY = 'asdfasdf';//becuase the envi was created only in index.ts(where the startup code is)but not in the test environment, so it should slaso be created here
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";//Setting NODE_TLS_REJECT_UNAUTHORIZED to "0" (or any falsy value) essentially disables certificate validation. This means 
  //that when making HTTPS requests, Node.js will not reject connections with invalid or self-signed certificates. This can be useful in development or testing scenarios 
  //when working with self-signed or expired certificates, but it's generally not recommended in production environments.
  
  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();// the Uri used to connect to the mongo server in memory

  await mongoose.connect(mongoUri, {});// use mongoose to connect to the mongo server uri
});

beforeEach(async () => {//run before each of the tests
  jest.clearAllMocks(); //clear the data saved in jest.fn() for each test
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

global.signin = () => {// implement the global signin function as a helper function
  // Build a JWT payload.  { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create the JWT!jwt.sign(use JWT_KEY to create jwt)
  const token = jwt.sign(payload, process.env.JWT_KEY!);// we know process.env.JWT_KEY exists because it is defined in "beforeAll"

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];//``means template. supertest expects an array of of all cookies when do tests
}; 


