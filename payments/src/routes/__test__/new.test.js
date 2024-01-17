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
const supertest_1 = __importDefault(require("supertest"));
const common_1 = require("@requiemleaftickets/common");
const app_1 = require("../../app");
const order_1 = require("../../models/order");
const stripe_1 = require("../../stripe");
const payment_1 = require("../../models/payment");
jest.mock("../../stripe"); //redirect the file in the () to file in mock folder with same name
it('returns a 404 when purchasing an order that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
        token: 'asldkfj',
        orderId: new mongoose_1.default.Types.ObjectId().toHexString(),
    })
        .expect(404);
}));
it('returns a 401 when purchasing an order that doesnt belong to the user', () => __awaiter(void 0, void 0, void 0, function* () {
    const order = order_1.Order.build({
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        userId: new mongoose_1.default.Types.ObjectId().toHexString(),
        version: 0,
        price: 20,
        status: common_1.OrderStatus.Created,
    });
    yield order.save();
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
        token: 'asldkfj',
        orderId: order.id,
    })
        .expect(401);
}));
it('returns a 400 when purchasing a cancelled order', () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongoose_1.default.Types.ObjectId().toHexString();
    const order = order_1.Order.build({
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 20,
        status: common_1.OrderStatus.Cancelled,
    });
    yield order.save();
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
        orderId: order.id,
        token: 'asdlkfj',
    })
        .expect(400);
}));
it('returns a 201 with valid inputs', () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongoose_1.default.Types.ObjectId().toHexString();
    const price = Math.floor(Math.random() * 100000);
    const order = order_1.Order.build({
        id: new mongoose_1.default.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price,
        status: common_1.OrderStatus.Created,
    });
    yield order.save();
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId)) // global.signin returns a valid token as current user
        .send({
        token: 'tok_visa',
        orderId: order.id,
    })
        .expect(201);
    const stripeCharges = yield stripe_1.stripe.charges.list({ limit: 50 });
    const stripeCharge = stripeCharges.data.find((charge) => {
        return charge.amount === price * 100;
    });
    expect(stripeCharge).toBeDefined();
    expect(stripeCharge.currency).toEqual('usd');
    const payment = yield payment_1.Payment.findOne({
        orderId: order.id,
        stripeId: stripeCharge.id,
    });
    expect(payment).not.toBeNull(); // different from undefined
    //test using mock strip.ts
    //const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];//1st argument in 1st call
    //expect(chargeOptions.source).toEqual('tok_visa');
    //expect(chargeOptions.amount).toEqual(20 * 100);
    //expect(chargeOptions.currency).toEqual('usd');
}));
