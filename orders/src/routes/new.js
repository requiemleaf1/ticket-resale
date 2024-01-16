"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrderRouter = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const common_1 = require("@requiemleaftickets/common");
const express_validator_1 = require("express-validator");
const ticket_1 = require("../models/ticket");
const order_1 = require("../models/order");
const order_created_publisher_1 = require("../events/publishers/order-created-publisher");
const nats_wrapper_1 = require("../nats-wrapper");
const router = express_1.default.Router();
exports.newOrderRouter = router;
const EXPIRATION_WINDOW_SECONDS = 15 * 60;
router.post('/api/orders', common_1.requireAuth, [
    (0, express_validator_1.body)('ticketId') //list all the validators
        .not() //built-in  validator
        .isEmpty()
        .custom((input) => mongoose_1.default.Types.ObjectId.isValid(input)) //costume validator, check if the ticketID is a valid ObjectID
        .withMessage('TicketId must be provided'),
], common_1.validateRequest, // reject request if validation fails
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticketId } = req.body;
    // Find the ticket the user is trying to order in the database
    const ticket = yield ticket_1.Ticket.findById(ticketId);
    if (!ticket) {
        throw new common_1.NotFoundError();
    }
    // Make sure that this ticket is not already reserved
    const isReserved = yield ticket.isReserved(); //reslove a boolean
    if (isReserved) {
        throw new common_1.BadRequestError('Ticket is already reserved');
    }
    // Run query to look at all orders.  Find an order where the ticket
    // is the ticket we just found *and* the orders status is *not* cancelled.
    // If we find an order from that means the ticket *is* reserved
    //moved to ticket.ts.
    //const existingOrder = await Order.findOne({
    //ticket: ticket,//this order's ticket property is referencing the ticket just found
    //status: {
    //$in: [//mongoDB operator to find the status in the statuses below
    //OrderStatus.Created,
    //OrderStatus.AwaitingPayment,
    //OrderStatus.Complete,
    //],
    //},
    //});
    //if (existingOrder) {//if find exiting order, return early
    //throw new BadRequestError('Ticket is already reserved');// error msg sent back to user
    //}
    // Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
    // Build the order and save it to the database
    const order = order_1.Order.build({
        userId: req.currentUser.id,
        status: common_1.OrderStatus.Created,
        expiresAt: expiration,
        ticket, // short for ticket:ticket
    });
    yield order.save();
    // Publish an event saying that an order was created
    new order_created_publisher_1.OrderCreatedPublisher(nats_wrapper_1.natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
            id: ticket.id,
            price: ticket.price,
        },
    });
    res.status(201).send(order);
}));
