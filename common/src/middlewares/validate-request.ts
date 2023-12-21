//defined to produce errors if request is not valid
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (//middleware function to be called in different services
  req: Request,
  res: Response,
  next: NextFunction// use of next indicates this is an express middleware function
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();// proceed to next middleware in chain
};
