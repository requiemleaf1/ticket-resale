import { Subjects, Publisher, OrderPaidEvent } from '@requiemleaftickets/common';

export class OrderPaidPublisher extends Publisher<OrderPaidEvent> {
  subject: Subjects.OrderPaid = Subjects.OrderPaid;
}


