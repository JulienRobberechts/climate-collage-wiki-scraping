/**
 * @jest-environment node
 */
const { readCardList } = require('./readCardList');

describe('readCardList', () => {
  it('read card list', async () => {
    const cards = await readCardList();
    expect(cards).toMatchSnapshot();
  });
});
