import { Subjects, Publisher, OrderPaidEvent } from '@requiemleaftickets/common';

export class PaymentPaidPublisher extends Publisher<PaymentPaidEvent> {
  subject: Subjects.OrderPaid = Subjects.PaymentPaid;
}
