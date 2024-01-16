"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.natsWrapper = void 0;
exports.natsWrapper = {
    client: {
        publish: jest
            .fn() //jest.fn() tracks the function so we can do expect(natsWrapper.client.publish).toHaveBeenCalled() in test file.
            .mockImplementation((subject, data, callback) => {
            callback();
        }),
    },
};
