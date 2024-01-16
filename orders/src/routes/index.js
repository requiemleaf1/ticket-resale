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
exports.indexOrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("@requiemleaftickets/common");
const order_1 = require("../models/order");
const router = express_1.default.Router();
exports.indexOrderRouter = router;
router.get('/api/orders', common_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_1.Order.find({
        userId: req.currentUser.id,
    }).populate('ticket'); //populate is the method in mongoDB to load the orders with the tickets that are associated with them simultiniously 
    //so that get orders and assoicated ticket in one database query
    res.send(orders);
}));
