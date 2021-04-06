/**
 * @jest-environment node
 */
const { getSectionContent } = require('./sectionApi');
const lang = 'fr';

describe('getSectionContent FR', () => {
  it('get carte_1', async () => {
    const pageId = 4;
    const pageContent = await getSectionContent(pageId, 0, lang);
    expect(pageContent).not.toBeFalsy();
    // expect(pageContent).toMatchSnapshot();
  });
  it('get carte_2', async () => {
    const pageId = 12;
    const pageContent = await getSectionContent(pageId, 1, lang);
    expect(pageContent).not.toBeFalsy();
    // expect(pageContent).toMatchSnapshot();
  });
  it('get carte_14', async () => {
    const pageId = 36;
    const pageContent = await getSectionContent(pageId, 2, lang);
    expect(pageContent).not.toBeFalsy();
    // expect(pageContent).toMatchSnapshot();
  });
  it('get list', async () => {
    const pageId = 140;
    const section = 2;
    const pageContent = await getSectionContent(pageId, section, lang);
    expect(pageContent).not.toBeFalsy();
    // expect(pageContent).toMatchSnapshot();
  });
});
