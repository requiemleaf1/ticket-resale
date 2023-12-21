import express, { Request, Response } from 'express';
import { requireAuth } from '@requiemleaftickets/common';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');//populate is the method in mongoDB to load the orders with the tickets that are associated with them simultiniously 
//so that get orders and assoicated ticket in one database query
  res.send(orders);
});

export { router as indexOrderRouter };
