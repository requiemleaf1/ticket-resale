import { Subjects, Publisher, OrderCancelledEvent } from '@requiemleaftickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
