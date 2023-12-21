import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';
//client is what actually connect to streaming server and exchange some information
const stan = nats.connect('ticketing', 'abc', {// stan is the terminology for client
  url: 'http://localhost:4222',// where the nats streaming server is
});//after the client successfully connects to the net, streaming server is going to emit a connect event.
//NATSstreaming server is running inside of our Kubernetes cluster, and by default, we don't
//have direct access to anything running inside there.
stan.on('connect', async () => {//listen for the Connect event.
  console.log('Publisher connected to NATS');//when connect event is received by stan execute the call back
  
  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',//message for Nats can only be JSON(string).client ID for Nats streaming server
      title: 'concert',
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }

  //stan.publish('ticket:created', data, () => {
   // console.log('Event published');
  //});
  
  //const data = JSON.stringify({
    //id: '123',
    //title: 'concert',
   // price: 20,
  //});
  
});
