"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// set up test environment, including mongo memory server
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
jest.mock("../nats-wrapper"); //redirect to the file with the same name in __mock__folder
let mongo;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    process.env.JWT_KEY = 'asdfasdf'; //becuase the envi was created only in index.ts(where the startup code is)but not in the test environment, so it should slaso be created here
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //Setting NODE_TLS_REJECT_UNAUTHORIZED to "0" (or any falsy value) essentially disables certificate validation. This means 
    //that when making HTTPS requests, Node.js will not reject connections with invalid or self-signed certificates. This can be useful in development or testing scenarios 
    //when working with self-signed or expired certificates, but it's generally not recommended in production environments.
    const mongo = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongo.getUri(); // the Uri used to connect to the mongo server in memory
    yield mongoose_1.default.connect(mongoUri, {}); // use mongoose to connect to the mongo server uri
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    jest.clearAllMocks(); //clear the data saved in jest.fn() for each test
    const collections = yield mongoose_1.default.connection.db.collections(); // remove all the data in the mongo server before each test 
    for (let collection of collections) {
        yield collection.deleteMany({});
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (mongo) {
        yield mongo.stop();
    }
    yield mongoose_1.default.connection.close();
}));
global.signin = (id) => {
    // Build a JWT payload.  { id, email }
    const payload = {
        id: id || new mongoose_1.default.Types.ObjectId().toHexString(),
        email: "test@test.com",
    };
    // Create the JWT!jwt.sign(use JWT_KEY to create jwt)
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY); // we know process.env.JWT_KEY exists because it is defined in "beforeAll"
    // Build session Object. { jwt: MY_JWT }
    const session = { jwt: token };
    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);
    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');
    // return a string thats the cookie with the encoded data
    return [`session=${base64}`]; //``means template. supertest expects an array of of all cookies when do tests
};
