export const natsWrapper = {
  client: {
    publish: jest
      .fn()//jest.fn() tracks the function so we can do expect(natsWrapper.client.publish).toHaveBeenCalled() in test file.
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
