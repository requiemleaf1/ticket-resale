import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to db');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    //The purpose of serializing errors is to transform the error object into a representation that 
    //can be easily understood and processed by the receiving end. It allows you to extract and structure relevant 
    //information from the error object, such as error messages or additional details, and present them in a consistent and standardized format.
    return [
      {
        message: this.reason,
      },
    ];
  }
}