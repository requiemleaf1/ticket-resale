import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from"jsonwebtoken";
import { validateRequest, BadRequestError} from "@requiemleaftickets/common";//wire up the middleware after the actual validation

import { User } from '../models/user';


const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,//use middleware to do check if there is validation error and the throw new error part after the "body" done request validation
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });// return the user document that is found or null if no user document with that email exists.

    if (existingUser) {
      //console.log('Email in use');
      //return res.send({});
      throw new BadRequestError('Email in use');// this message is only for internally log purpose, the client won't see it in response
    }

    const user = User.build({ email, password });//user is a mongoDB document object which has a mongoDB created ID, email and password
    await user.save();

    //Generate JWT
    const userJwt = jwt.sign({
      id:user.id,
      email: user.email
    }, process.env.JWT_KEY!);//second argument is signing signature used to validate the jwt which is shared among all the services.
    // the key used as signing signature is defined when create secret in kubenette cluster. secret->env->jwt. So the signing signature won't be stored in any config file that can be accessed.it is stored in a envi inside the container. more secure
    //Store it on session object(cookie)"!" ask TS to ignore the protential error 
    //the name of env var and kube secret are kept consistent 
    req.session = {
      jwt:userJwt
    };// all request afterwards will have this cookie appendened which stores a jwt.

    res.status(201).send(user);
  }
);

export { router as signupRouter };
//mongoose and TS are not naturally compatible. need configuration
//ts can't tell when augument provided in code is wrong
//mongoose creates more properties than we provide. need to teach ts to differiate them
