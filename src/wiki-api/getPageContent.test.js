/**
 * @jest-environment node
 */
const { getPageContent } = require('./getPageContent');

describe('getPageContent', () => {
  it('get carte_1', async () => {
    const pageId = 4;
    const pageContent = await getPageContent(pageId);
    expect(pageContent).not.toBeFalsy();
  });
  it('get carte_2', async () => {
    const pageId = 12;
    const pageContent = await getPageContent(pageId);
    expect(pageContent).not.toBeFalsy();
  });
  it('get carte_14', async () => {
    const pageId = 36;
    const pageContent = await getPageContent(pageId);
    expect(pageContent).not.toBeFalsy();
  });
});
