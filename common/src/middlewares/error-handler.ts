//define error handling middleware to capture errors when they are thrown in different services
import { Request, Response, NextFunction } from "express";
import { CustomError } from '../errors/custom-error';

export const errorHandler = (//in Express error handler middleware receives more arguments(err) than regular middleware
  err: Error,//err is an Error object of built-in Error interface of js，which is thrownfrom signup handler
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) { //ckeck if the thrown error is subclass of substract class CustomError
    return res.status(err.statusCode).send({errors: err.serializeErrors()});
  }

  //error is of ValidationError from express-validator, it has type, msg, and path as properties
     
  //400 status means bad request
  //500 is interal server error
  console.error(err);
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};

 //middleware flattened all the different types of errors so there is a universal object type to be send back to react app   
    
    
  