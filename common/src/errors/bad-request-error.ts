import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError{// CustomError is abstract class, so you need to actually implement the property and method
  statusCode = 400;

  constructor(public message:string) {//fullfill same purpose as java--this.message=message
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(){
    return [{ message: this.message}];
  }

}