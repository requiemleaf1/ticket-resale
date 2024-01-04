// Express for Tickets microservice
// only configure the express application but not start it
import express from "express";
import "express-async-errors";//this package used to make express handle errors correctly when using async function, so the errors will be thrown immediately without awaits
import { errorHandler, NotFoundError, currentUser} from "@requiemleaftickets/common";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { createTicketRouter} from "./routes/new";//"post" handler create new ticket
import { showTicketRouter } from "./routes/show";//"get" handler retrieve ticket with ID
import { indexTicketRouter } from "./routes/index";//"get" handler retrieve all tickets
import { updateTicketRouter } from"./routes/update";//"put" handler update a ticket with ID

const app = express();
app.set("trust proxy", true);// make express trust traffic from Ingress Ngingx(poxy)
app.use(json());
app.use(
  cookieSession({
    signed: false,//disable encryption on this cookie. JSON web token itself is already encrypted
    secure: false// cookies will only be used if a user is visiting our application over an HTTPS connection if set to true
  })// this means if NODE_ENV node environmental variable in the NodeJs environmental variable set is "test", the connection doesn't need to be secure
);//when Jest run tests at the terminal NODE_ENV is set to "test"
app.use(currentUser);

app.use(createTicketRouter);//wire the router up
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

//app.get("*", async(req,res)=>{//app.all() is all method
 // throw new NotFoundError();//throw an error here and TS take that from there
//});//if a callback marked async it won't immediately return any value, 
   //Instead, it's going to return a promise that's going to resolve with some value in the future
   //use "next" function to make the express middleware work normally

export { app }; // export the express app