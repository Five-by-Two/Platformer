// @ts-ignore
global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve('hey') }),
);

test('Example test', async () => {
    expect(true).toBe(true);
});
