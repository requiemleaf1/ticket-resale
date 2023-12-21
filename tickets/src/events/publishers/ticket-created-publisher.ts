import { Publisher, Subjects, TicketCreatedEvent } from '@requiemleaftickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
