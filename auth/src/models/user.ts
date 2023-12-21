import mongoose from "mongoose";
import {Password} from "../services/password";

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  email: string;
  password: string;// this interface is ts code, so it is small string
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;//the model has a method to create new user
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({// Schema is to tell monogoose how the object to be stored is built
  email:{//Schema is used to create model. model is class used to represent the entire data collection
    type: String,//in mongoose use String not string because it refers to built-in String constructor in JS
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  toJSON: {// used to turn something to plain JSON
    //delete some properties from the response JSON object
    transform(doc, ret) {// transform() is a mongoDB method. doc is the user document being transformed, ret is the returned JSOn object of the user document
      ret.id = ret._id;
      delete ret._id;// delete is JS keyword
      delete ret.password;
      delete ret.__v;
    },
  },
});

userSchema.pre('save', async function(done) {//this is a middleware function implemented in Mongoose.Any time we attempt to save a document to our database, we are going to execute this function first
  if (this.isModified('password')) {//we are responsible for calling done function once we have done all the work we need to do inside
    const hashed = await Password.toHash(this.get('password'));//we have to do await call, anything else we want to do.And then at the very end we have to call it done.
    this.set('password', hashed);//get the user's password off the user document and pass it into toHash
  }
  done();//call done because we've now done all the asynchronous work. then the user doc with newly hashed password will be saved to mongoDB 
});
//build a custom function in model by adding a function to statics object
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);//<>is used because mongoose.model<T,U> takes in generic types

//const buildUser = (attrs: UserAttrs) => {//can't use new key word to create UserAttrs instance if you want ts to be able to check the property
    //  return new User(attrs);
//};                                       
//if use new User() directly and don't have interface pre-defined, ts won't be able to watch out for wrong property


export { User};

