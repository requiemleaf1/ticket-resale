import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {// if the user isn't logged in(req.currentUser is undefined)
    throw new NotAuthorizedError();
  }

  next();//move on to next middleware
};
