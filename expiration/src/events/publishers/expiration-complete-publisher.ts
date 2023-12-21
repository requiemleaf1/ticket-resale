import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@requiemleaftickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
