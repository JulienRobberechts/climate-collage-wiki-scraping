/**
 * @jest-environment node
 */
const {
  readCards,
  getSectionContentByName,
} = require('./readCard');


const {
  sectionMain,
  sectionDefinition,
  sectionExplanation,
  sectionAdvice,
  sectionOtherLinks,
  sectionOtherLinksCauses,
  sectionOtherLinksEffects,
  sectionRef,
} = require('../extraction/sectionExtractor');

describe('getSectionContentByName', () => {
  const checkSectionExists = async (wikiId, sectionName) => {
    const content = await getSectionContentByName(wikiId, sectionName);
    expect(content.length).toBeGreaterThan(50);
    return content;
  }
  const checkSectionNOTExists = async (wikiId, sectionName) => {
    const content = await getSectionContentByName(wikiId, sectionName);
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


