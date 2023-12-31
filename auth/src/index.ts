// only contains startup code to start the express app on a specific port
import mongoose from "mongoose"; // mongoose is the js lib used to get access to mongoDB
import { app } from "./app";
const start = async () => {

  console.log("Starting up...");

  if (!process.env.JWT_KEY) {// add the check when start to deploy the code to see if the environmental variable is definded in depl.yaml
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {// add the check when start to deploy the code to see if the environmental variable is definded in depl.yaml
    throw new Error(' MONGO_URI must be defined');
  }  
  try {
      await mongoose.connect(process.env.MONGO_URI//domain came from the service name and port in mongo-depl file
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        //useCreateIndex: true,
      );  
      console.log('Connected to MongoDb');//"auth" is the name given to the database for specific application. mongoDB will create the database for us
  } catch (err) {
    console.error(err);//wrap the function in try and catch to make sure if there is an error, the error will be logout and
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });  
};

start();// run start() defined above
