// only contains startup code to start the express app on a specific port
import mongoose from "mongoose"; // mongoose is the js lib used to get access to mongoDB
import { app } from "./app";
import { natsWrapper } from './nats-wrapper';
import { TicketCreatedListener } from './events/listeners/ticket-created-listener';
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener';
import { ExpirationCompleteListener} from "./events/listeners/expiration-complete-listener";

const start = async () => {
  if (!process.env.JWT_KEY) {// add the check when start to deploy the code to see if the environmental variable is definded in depl.yaml
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {// add the check when start to deploy the code to see if the environmental variable is definded in depl.yaml
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
    await natsWrapper.connect(//use enviromental virables defined in depl to avoid hard code
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,//client id needs to be unique for evey copy of client service, so use the pod name of tickets-depl(unique for evry pod)
      process.env.NATS_URL// because we have one container in the tickets-depl. and one container runs one copy of service
    );//clusterID, userID, URL
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());   

    new TicketCreatedListener(natsWrapper.client).listen();//start one listener
    new TicketUpdatedListener(natsWrapper.client).listen();//start one listener
    new ExpirationCompleteListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);//domain came from the service name and port in mongo-depl file
    console.log('Connected to MongoDb');//"auth" is the name given to the database for specific application. mongoDB will create the database for us
  } catch (err) {
    console.error(err);//wrap the function in try and catch to make sure if there is an error, the error will be logout and
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });  
};

start();

