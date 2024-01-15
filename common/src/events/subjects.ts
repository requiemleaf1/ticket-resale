export enum Subjects {// all the channels to be used
  TicketCreated = 'ticket:created',
  TicketUpdated = "ticket:updated",

  OrderCreated = 'order:created',
  OrderCancelled = 'order:cancelled',
  OrderPaid = "order:paid",

  ExpirationComplete = "expiration:complete",

  PaymentCreated = "payment:created",
}
