/**
 * @jest-environment node
 */
const { readCardList } = require('./readCardList');

describe('readCardList', () => {
  it('read card list FR', async () => {
    const lang = 'fr';
    const cards = await readCardList(lang);
    expect(cards).toMatchSnapshot();
  });
  it('read card list EN', async () => {
    const lang = 'en';
    const cards = await readCardList(lang);
    expect(cards).toMatchSnapshot();
  });
});
