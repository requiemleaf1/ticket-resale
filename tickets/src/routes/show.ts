import express, { Request, Response } from 'express';
import { NotFoundError } from '@requiemleaftickets/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);//built-in function for mongoDB model, return doc or null

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);//no status code specified, so the default is 200
});

export { router as showTicketRouter };
