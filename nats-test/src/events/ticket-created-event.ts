import { Subjects } from './subjects';

export interface TicketCreatedEvent {//ticketcreate event uses ticketcreated channel and specific data
  subject: Subjects.TicketCreated;//so the subject and data are bond together
  data: {
    id: string;
    title: string;
    price: number;
  };
}
