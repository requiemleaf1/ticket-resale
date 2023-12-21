// mock strip object for testing purpose
export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({}),
  },
};
