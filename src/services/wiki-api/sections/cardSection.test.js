/**
 * @jest-environment node
 */
const { getSectionContentByName } = require('./cardSection');
const { getSectionNames } = require('./sectionNames');

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
    const lang = 'fr';
    const content = await checkSectionExists(4, getSectionNames(lang).sectionMain);
    // expect(content).toMatchSnapshot();
  });
  it('section Definition 1', async () => {
    const lang = 'fr';
    await checkSectionNOTExists(4, getSectionNames(lang).sectionDefinition);
  }); it('section Advice 1', async () => {
    const lang = 'fr';
    await checkSectionNOTExists(4, getSectionNames(lang).sectionAdvice);
  });

});


