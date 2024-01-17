"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
// mock strip object for testing purpose
exports.stripe = {
    charges: {
        create: jest.fn().mockResolvedValue({}),
    },
};
