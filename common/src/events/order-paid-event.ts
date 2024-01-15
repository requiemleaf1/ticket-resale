import { Subjects } from './subjects';

export interface OrderPaidEvent {
  subject: Subjects.OrderPaid;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}
