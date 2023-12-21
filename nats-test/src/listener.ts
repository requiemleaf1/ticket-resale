import nats from 'node-nats-streaming';
import { randomBytes} from "crypto";
import {TicketCreatedListener} from "./events/ticket-created-listener";

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString("hex"), {//may have mutiple copies of listener clients with randomly generated ID
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');
  
  stan.on('close', () => {// client listen for close event,and then kill itself after close event
    console.log('NATS connection closed!');// it makes sure that the connection closed first before the process exit
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());//command "rs" client close the connection to Nats server when get interruption and termination
process.on('SIGTERM', () => stan.close());//crtl C it makes sure the connection close immediately when interruption occur
//otherwise the server will wait for some time(heartbeat) to determine the connection is closed.

