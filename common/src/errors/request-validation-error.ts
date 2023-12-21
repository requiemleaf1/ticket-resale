import { ValidationError } from "express-validator";//a type from "express-validator" which is an object that has msg and path
import { CustomError } from './custom-error';"same as custom-error"

export class RequestValidationError extends CustomError {//subclass of built-in class Error
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');// notice the syntax for errors property 
    

    // added Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}

