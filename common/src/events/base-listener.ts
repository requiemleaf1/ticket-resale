import {Message, Stan} from "node-nats-streaming";
import { Subjects } from './subjects';

interface Event {//generic event 
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {//Listener is generic class useing generic type"T"
  abstract subject: T['subject'];// so the subject and data would match
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: Message): void;
  protected client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()//send sent messages again when a new client put on
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)//parse string to JSON
      : JSON.parse(data.toString('utf8'));
  }
}
//create ubscriptionOptions object set options for subscription instance.need manual acknowledge
    //this subscription to the channel will have a queue group so only one(random) copy of this client will receive the event
  //create subscription to a channel
  //subscription object listen for message event when publisher publish an event
  //Message is the type that nats uses for event
  //manually ack reception. if no msg.ack(), nats server will keep trying to send the same event