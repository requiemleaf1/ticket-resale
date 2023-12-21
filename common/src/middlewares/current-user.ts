//defined to extract the payload of JWT and set it to currentUser property of request so it can be used elsewhere
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {// Request is an Express interface
    interface Request {//add optional property to existing interface
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {//same as(!req.session||!req.session.jwt) if the cookieseesion of the request is undifined or the jwt inside the cookiesession is undefined
    return next(); //move on to the next moddleware in the chain
  }

  try {
    const payload = jwt.verify(// verify the JWT bond in the request with the JWT_KEY stored in the environmental variable & decode the JWT
      req.session.jwt,//a kubernetes cluster has one secret, so the signing key as a env stored in different containers are the same, one container has one set of environmental variables
      process.env.JWT_KEY!
    ) as UserPayload;//used to indicated the type of return value
    req.currentUser = payload;
  } catch (err) {}// if the verify fails

  next();
};
