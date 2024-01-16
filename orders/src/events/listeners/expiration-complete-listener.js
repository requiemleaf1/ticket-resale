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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpirationCompleteListener = void 0;
const common_1 = require("@requiemleaftickets/common");
const queue_group_name_1 = require("./queue-group-name");
const order_1 = require("../../models/order");
const order_cancelled_publisher_1 = require("../publishers/order-cancelled-publisher");
class ExpirationCompleteListener extends common_1.Listener {
    constructor() {
        super(...arguments);
        this.queueGroupName = queue_group_name_1.queueGroupName;
        this.subject = common_1.Subjects.ExpirationComplete;
    }
    onMessage(data, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_1.Order.findById(data.orderId).populate('ticket');
            if (!order) {
                throw new Error('Order not found');
            }
            if (order.status === common_1.OrderStatus.Complete) { // if the order is paid return early
                return msg.ack();
            }
            order.set({
                status: common_1.OrderStatus.Cancelled,
            });
            yield order.save();
            yield new order_cancelled_publisher_1.OrderCancelledPublisher(this.client).publish({
                id: order.id,
                version: order.version,
                ticket: {
                    id: order.ticket.id,
                },
            });
            msg.ack();
        });
    }
}
exports.ExpirationCompleteListener = ExpirationCompleteListener;
