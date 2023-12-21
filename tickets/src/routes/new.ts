import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@requiemleaftickets/common';
import { body } from 'express-validator';
import {Ticket} from "../models/ticket";
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  '/api/tickets', 
  requireAuth,
  [
  body('title').not().isEmpty().withMessage('Title is required'),//cover both title is not defined and is defined as an empty string
  body('price')
    .isFloat({ gt: 0 })// means greater than
    .withMessage('Price must be greater than 0'),
  ],
  validateRequest, 
  async(req: Request, res: Response) => {//the chain in the express router is to 1 vilidate auth, 2 validate request body, 3 check if "errors" exists throw an error
    const { title, price } = req.body;
    const ticket = Ticket.build({//build() function of Ticket mongoDB model
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    await new TicketCreatedPublisher(natsWrapper.client).publish({//get the private_client 
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(201).send(ticket);// use requireAuth middleware to validate the post request first. user must be authonticated to make post requests
  }
);

export { router as createTicketRouter }; //rename router to avoid too many "router" created
