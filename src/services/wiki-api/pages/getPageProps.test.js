/**
 * @jest-environment node
 */
const { getPageId } = require('./getPageProps');

const lang = 'fr';

describe('get Page Id', () => {
  it('get carte_1', async () => {
    const pageTitle = "Fr-fr adulte carte 1 activit\u00e9s humaines";
    const pageId = await getPageId(pageTitle, lang);
    expect(pageId).toBe(4);
  });
  it('get carte_2', async () => {
    const pageTitle = "Fr-fr_adulte_carte_2_industrie";
    const pageId = await getPageId(pageTitle, lang);
    expect(pageId).toBe(12);
  });
});
