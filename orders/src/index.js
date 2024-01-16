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
// only contains startup code to start the express app on a specific port
const mongoose_1 = __importDefault(require("mongoose")); // mongoose is the js lib used to get access to mongoDB
const app_1 = require("./app");
const nats_wrapper_1 = require("./nats-wrapper");
const ticket_created_listener_1 = require("./events/listeners/ticket-created-listener");
const ticket_updated_listener_1 = require("./events/listeners/ticket-updated-listener");
const expiration_complete_listener_1 = require("./events/listeners/expiration-complete-listener");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("dwdf");
    if (!process.env.JWT_KEY) { // add the check when start to deploy the code to see if the environmental variable is definded in depl.yaml
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) { // add the check when start to deploy the code to see if the environmental variable is definded in depl.yaml
        throw new Error(' MONGO_URI must be defined');
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }
    try {
        yield nats_wrapper_1.natsWrapper.connect(//use enviromental virables defined in depl to avoid hard code
        process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, //client id needs to be unique for evey copy of client service, so use the pod name of tickets-depl(unique for evry pod)
        process.env.NATS_URL // because we have one container in the tickets-depl. and one container runs one copy of service
        ); //clusterID, userID, URL
        nats_wrapper_1.natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => nats_wrapper_1.natsWrapper.client.close());
        process.on('SIGTERM', () => nats_wrapper_1.natsWrapper.client.close());
        new ticket_created_listener_1.TicketCreatedListener(nats_wrapper_1.natsWrapper.client).listen(); //start one listener
        new ticket_updated_listener_1.TicketUpdatedListener(nats_wrapper_1.natsWrapper.client).listen(); //start one listener
        new expiration_complete_listener_1.ExpirationCompleteListener(nats_wrapper_1.natsWrapper.client).listen();
        yield mongoose_1.default.connect(process.env.MONGO_URI); //domain came from the service name and port in mongo-depl file
        console.log('Connected to MongoDb'); //"auth" is the name given to the database for specific application. mongoDB will create the database for us
    }
    catch (err) {
        console.error(err); //wrap the function in try and catch to make sure if there is an error, the error will be logout and
    }
    app_1.app.listen(3000, () => {
        console.log("Listening on port 3000!!!!!!!!");
    });
});
start();
