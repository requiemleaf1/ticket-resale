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
const mongoose_1 = __importDefault(require("mongoose"));
const ticket_updated_listener_1 = require("../ticket-updated-listener");
const nats_wrapper_1 = require("../../../nats-wrapper");
const ticket_1 = require("../../../models/ticket");
const setup = () => __awaiter(void 0, void 0, void 0, function* () {
    // Create a listener
    const listener = new ticket_updated_listener_1.TicketUpdatedListener(nats_wrapper_1.natsWrapper.client);
    // Create and save a ticket
    const ticket = ticket_1.Ticket.build({
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
    });
    yield ticket.save();
    // Create a fake data object
    const data = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'new concert',
        price: 999,
        userId: 'ablskdjf',
    };
    // Create a fake msg object
    // @ts-ignore
    const msg = {
        ack: jest.fn(),
    };
    // return all of this stuff
    return { msg, data, ticket, listener };
});
it('finds, updates, and saves a ticket', () => __awaiter(void 0, void 0, void 0, function* () {
    const { msg, data, ticket, listener } = yield setup();
    yield listener.onMessage(data, msg);
    const updatedTicket = yield ticket_1.Ticket.findById(ticket.id);
    expect(updatedTicket.title).toEqual(data.title);
    expect(updatedTicket.price).toEqual(data.price);
    expect(updatedTicket.version).toEqual(data.version);
}));
it('acks the message', () => __awaiter(void 0, void 0, void 0, function* () {
    const { msg, data, listener } = yield setup();
    yield listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
}));
it('does not call ack if the event has a skipped version number', () => __awaiter(void 0, void 0, void 0, function* () {
    const { msg, data, listener, ticket } = yield setup();
    data.version = 10;
    try {
        yield listener.onMessage(data, msg);
    }
    catch (err) { }
    expect(msg.ack).not.toHaveBeenCalled();
}));
