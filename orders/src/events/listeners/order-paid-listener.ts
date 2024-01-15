import {
  Listener,
  Subjects,
  OrderPaidEvent,
  OrderStatus,
} from '@requiemleaftickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';

export class ExpirationCompleteListener extends Listener<OrderPaidEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.OrderPaid = Subjects.OrderPaid;

  async onMessage(data: OrderPaidEvent['data'], msg: Message) {
    const order = await Order.findById(data.id).populate('ticket');

    if (!order) {
      throw new Error('Order not found');
    }
    
    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();
   
    msg.ack();
  }
}
