import {
  Listener,
  Subjects,
  OrderPaidEvent,
  OrderStatus,
} from '@requiemleaftickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class OrderPaidListener extends Listener<OrderPaidEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.OrderPaid = Subjects.OrderPaid;

  async onMessage(data: OrderPaidEvent['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
    version: data.version - 1,
  });

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
