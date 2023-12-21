// only contains startup code to start the express app on a specific port
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener} from "./events/listeners/order-created-listener";

const start = async () => {
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

    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.error(err);//wrap the function in try and catch to make sure if there is an error, the error will be logout and
  }
};

start();

