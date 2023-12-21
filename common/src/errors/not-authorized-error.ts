// definee the error when the user try to access some resource that they are not authorized to
import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;//the user is forbidden 

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
