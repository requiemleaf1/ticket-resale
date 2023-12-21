import { Publisher, Subjects, TicketUpdatedEvent } from '@requiemleaftickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
