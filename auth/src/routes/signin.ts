import express, { Request, Response }  from 'express';
import { body} from "express-validator";//body contains series of functions to do validatioan on request body
import jwt from 'jsonwebtoken';
//validationResult returns the result of the validation on the request body. so they should be used together
import { validateRequest,BadRequestError  } from "@requiemleaftickets/common"; //middleware to do validation on request
import { Password } from '../services/password';
import { User } from '../models/user';

const router = express.Router();

router.post(//use body to do validation on request body
   "/api/users/signin",
   [
     body("email").isEmail().withMessage("Email must be valid"),
     body("password")
       .trim()// used to trim space in front and at end
       .notEmpty()
       .withMessage("You must supply a password"),
   ],
   validateRequest,// call middleware to do validation and throw error after the "body" done actual validation operation
   async (req: Request, res: Response) => {
      const { email, password } = req.body;
  
      const existingUser = await User.findOne({ email });//Databse quaries are async function because they take time
      if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
      }
  
      const passwordsMatch = await Password.compare(// compare() is async function because it takes some time
        existingUser.password,
        password
      );
      if (!passwordsMatch) {
        throw new BadRequestError('Invalid Credentials');
      }
  
      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
        },
        process.env.JWT_KEY!// use payload and signing signature to generate JWT
      );
  
      // Store it on session object
      req.session = {
        jwt: userJwt,
      };
  
      res.status(200).send(existingUser);
    }
    //this callback can be empty since the possible error has been handled in validateRequest middleware
 );

export { router as signinRouter };
