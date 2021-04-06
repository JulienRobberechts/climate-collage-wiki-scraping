/**
 * @jest-environment node
 */
const { getSectionContentByName } = require('./cardSection');

const {
  sectionMain,
  sectionDefinition,
  sectionAdvice,
} = require('./sectionNames.fr');

const lang = 'fr';

describe('getSectionContentByName FR', () => {
  const checkSectionExists = async (wikiId, sectionName) => {
    const content = await getSectionContentByName(wikiId, sectionName, lang);
    expect(content.length).toBeGreaterThan(50);
    return content;
  }
  const checkSectionNOTExists = async (wikiId, sectionName) => {
    const content = await getSectionContentByName(wikiId, sectionName, lang);
    expect(content.length).toBe(0);
    return content;
  }
  it('section Main 1', async () => {
    const content = await checkSectionExists(4, sectionMain);
    // expect(content).toMatchSnapshot();
  });
  it('section Definition 1', async () => {
    await checkSectionNOTExists(4, sectionDefinition);
  }); it('section Advice 1', async () => {
    await checkSectionNOTExists(4, sectionAdvice);
  });

});


