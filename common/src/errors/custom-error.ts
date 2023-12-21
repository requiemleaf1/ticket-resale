export abstract class CustomError extends Error {
  abstract statusCode: number;//notice the modifier"abstract" for abstract class

  constructor(message: string) {
    super(message);// equals to new Error("message here")

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];//only difference than interface is abstract class can be 
  //kept when converted to JS so can use instanceof
}
