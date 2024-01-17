"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPaidPublisher = void 0;
const common_1 = require("@requiemleaftickets/common");
class OrderPaidPublisher extends common_1.Publisher {
    constructor() {
        super(...arguments);
        this.subject = common_1.Subjects.OrderPaid;
    }
}
exports.OrderPaidPublisher = OrderPaidPublisher;
