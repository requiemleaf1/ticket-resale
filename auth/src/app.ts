// Express for Auth microservice
// only configure the express application but not start it
import express from "express";
import "express-async-errors";//this package used to make express handle errors correctly when using async function, so the errors will be thrown immediately without awaits
import { errorHandler, NotFoundError} from "@requiemleaftickets/common";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import{ currentUserRouter} from "./routes/current-user";
import { signinRouter} from "./routes/signin";
import { signupRouter} from "./routes/signup";
import { signoutRouter} from "./routes/signout";

const app = express();
app.set("trust proxy", true);// make express trust traffic from Ingress Ngingx(poxy)
app.use(json());
app.use(
  cookieSession({
    signed: false,//disable encryption on this cookie. JSON web token itself is already encrypted
    secure: process.env.NODE_ENV !== 'test'// cookies will only be used if a user is visiting our application over an HTTPS connection if set to true
  })// this means if NODE_ENV node environmental variable in the NodeJs environmental variable set is "test", the connection doesn't need to be secure
);//when Jest run tests at the terminal NODE_ENV is set to "test"
app.use(currentUserRouter);//those are middleware inside use()
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.get("*", async(req,res)=>{//app.all() is all method
  throw new NotFoundError();//throw an error here and TS take that from there
});//if a callback marked async it won't immediately return any value, 
   //Instead, it's going to return a promise that's going to resolve with some value in the future
   //use "next" function to make the express middleware work normally
app.use(errorHandler);

export { app }; // export the express app