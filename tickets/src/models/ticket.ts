import mongoose from 'mongoose';
import { updateIfCurrentPlugin} from "mongoose-update-if-current";

interface TicketAttrs {//attrs are the propertities we want for each record
  title: string;//we're referring to a type that is specifically for TypeScript.So we use lowercase s up here.
  price: number;
  userId: string;
}

interface TicketDoc extends mongoose.Document {// Doc is the object that is actually saved in mongoDB
  title: string;// will have more properties than TicketAttrs
  price: number;
  userId: string;
  version: number;//added for concurrency version control
  orderId?: string;//null when first created
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,//we are referring to the global string constructor in JavaScript and that means we should have a capital S.
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    }
  },

  {
    toJSON: {
      transform(doc, ret) {// ret is the object to be converted
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
ticketSchema.set("versionKey", "version");// change default __v property in a doc to "version"
ticketSchema.plugin(updateIfCurrentPlugin);// wireup yje installed module

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };