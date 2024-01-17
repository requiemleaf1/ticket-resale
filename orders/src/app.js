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
exports.app = void 0;
// Express for Tickets microservice
// only configure the express application but not start it
const express_1 = __importDefault(require("express"));
require("express-async-errors"); //this package used to make express handle errors correctly when using async function, so the errors will be thrown immediately without awaits
const common_1 = require("@requiemleaftickets/common");
const body_parser_1 = require("body-parser");
const cookie_session_1 = __importDefault(require("cookie-session"));
const delete_1 = require("./routes/delete");
const index_1 = require("./routes/index");
const new_1 = require("./routes/new");
const show_1 = require("./routes/show");
const app = (0, express_1.default)();
exports.app = app;
app.set("trust proxy", true); // make express trust traffic from Ingress Ngingx(poxy)
app.use((0, body_parser_1.json)());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: false // cookies will only be used if a user is visiting our application over an HTTPS connection if set to true
}) // this means if NODE_ENV node environmental variable in the NodeJs environmental variable set is "test", the connection doesn't need to be secure
); //when Jest run tests at the terminal NODE_ENV is set to "test"
app.use(common_1.currentUser);
app.use(delete_1.deleteOrderRouter); //wire the router up
app.use(index_1.indexOrderRouter);
app.use(new_1.newOrderRouter);
app.use(show_1.showOrderRouter);
app.all('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new common_1.NotFoundError();
}));
app.use(common_1.errorHandler);
