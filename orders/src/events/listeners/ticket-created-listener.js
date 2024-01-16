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
exports.TicketCreatedListener = void 0;
const common_1 = require("@requiemleaftickets/common");
const ticket_1 = require("../../models/ticket");
const queue_group_name_1 = require("./queue-group-name");
class TicketCreatedListener extends common_1.Listener {
    constructor() {
        super(...arguments);
        this.subject = common_1.Subjects.TicketCreated;
        this.queueGroupName = queue_group_name_1.queueGroupName;
    }
    onMessage(data, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, price } = data;
            const ticket = ticket_1.Ticket.build({
                id,
                title,
                price,
            });
            yield ticket.save();
            msg.ack();
        });
    }
}
exports.TicketCreatedListener = TicketCreatedListener;
