import { Listener, OrderCreatedEvent, Subjects } from '@requiemleaftickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this many milliseconds to process the job:', delay);

    await expirationQueue.add(//add a job to the queue
      {
        orderId: data.id,
      },
      {
        delay,//one of optional jobOption property to define the delay between add job and process job
      }//equals to delay:delay
    );

    msg.ack();
  }
}
