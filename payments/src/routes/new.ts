import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from '@requiemleaftickets/common';
import { stripe} from "../stripe";
import { Order } from '../models/order';
import { Payment} from "../models/payment";
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { OrderPaidPublisher} from "../events/publishers/order-paid-publisher";
import {natsWrapper} from"../nats-wrapper";


const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,//authoticated user
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,// send error if the "body" validation fails
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for an cancelled order');
    }
    
    const charge = await stripe.charges.create({// stripe creates a charhe object to fulfill the payment
      currency:"usd",
      amount: order.price * 100,
      source: token,
    });
    const payment = Payment.build ({
      orderId,
      stripeId: charge.id,
    });
    order.status = OrderStatus.Complete;
    await payment.save();
    await order.save;
    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,// every mongoDB document has an id(converted from id)
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });
    new OrderPaidPublisher(natsWrapper.client).publish({
      id: orderId,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      }
    })
    console.log("order paid");
    res.status(201).send({ id: payment.id});
  }
);

export { router as createChargeRouter };
