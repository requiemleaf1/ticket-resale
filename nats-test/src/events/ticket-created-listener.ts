import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {//type is determined when used
  readonly subject = Subjects.TicketCreated;//TicketCreatedEvent is Event implicitely because it has the same property as Event
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log('Event data!', data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    msg.ack();
  }
}
