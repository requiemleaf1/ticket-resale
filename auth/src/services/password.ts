//used to handle passwords: encript passwords and compare passwords--hashing
import { scrypt, randomBytes } from 'crypto';// scrypt is a hashing function, it's call-back based
import { promisify } from 'util';//to promisify a call-back based function so we can use async and awaits

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');//generates a random string 
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;//hash the password and the salt

    return `${buf.toString('hex')}.${salt}`;//template string, Buffer is not string, join buffer and salt together by"."
  }

  static async compare(storedPassword: string, suppliedPassword: string) {// compare is async function 
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
