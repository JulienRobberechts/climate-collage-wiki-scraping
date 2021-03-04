const { getObject } = require('../../utils/fileServices/readFile');
const {
  sectionMain,
  sectionDefinition,
  sectionExplanation,
  sectionAdvice,
  sectionOtherLinksCauses,
  sectionOtherLinksEffects,
} = require('./sectionNames.fr');
const { getSectionIndex } = require('./sectionExtractor');



async function getSectionIndexForCardNum(cardNum, sectionName) {
  const sourceFile = `./src/tests/data/section-card-${cardNum}.json`;
  const sections = await getObject(sourceFile);
  return getSectionIndex(sections, sectionName);
};

describe('card 1 get section', () => {
  it('card 1 - sectionMain', async () => {
    expect(await getSectionIndexForCardNum(1, sectionMain)).toBe(0);
  });
  it('card 1 - sectionDefinition', async () => {
    expect(await getSectionIndexForCardNum(1, sectionDefinition)).toBe(-1);
  });
  it('card 1 - sectionExplanation', async () => {
    expect(await getSectionIndexForCardNum(1, sectionExplanation)).toBe(1);
  });
  it('card 1 - sectionAdvice', async () => {
    expect(await getSectionIndexForCardNum(1, sectionAdvice)).toBe(-1);
  });
  it('card 1 - sectionOtherLinksCauses', async () => {
    expect(await getSectionIndexForCardNum(1, sectionOtherLinksCauses)).toBe(3);
  });
  it('card 1 - sectionOtherLinksEffects', async () => {
    expect(await getSectionIndexForCardNum(1, sectionOtherLinksEffects)).toBe(4);
  });
});

describe('card 6 get section', () => {
  it('card 6 - sectionMain', async () => {
    expect(await getSectionIndexForCardNum(6, sectionMain)).toBe(0);
  });
  it('card 6 - sectionDefinition', async () => {
    expect(await getSectionIndexForCardNum(6, sectionDefinition)).toBe(1);
  });
  it('card 6 - sectionExplanation', async () => {
    expect(await getSectionIndexForCardNum(6, sectionExplanation)).toBe(2);
  });
  it('card 6 - sectionAdvice', async () => {
    expect(await getSectionIndexForCardNum(6, sectionAdvice)).toBe(3);
  });
  it('card 6 - sectionOtherLinksCauses', async () => {
    expect(await getSectionIndexForCardNum(6, sectionOtherLinksCauses)).toBe(5);
  });
  it('card 6 - sectionOtherLinksEffects', async () => {
    expect(await getSectionIndexForCardNum(6, sectionOtherLinksEffects)).toBe(6);
  });
});

describe('card 5 get section', () => {
  it('card 5 - sectionMain', async () => {
    expect(await getSectionIndexForCardNum(5, sectionMain)).toBe(0);
  });
  it('card 5 - sectionDefinition', async () => {
    expect(await getSectionIndexForCardNum(5, sectionDefinition)).toBe(-1);
  });
  it('card 5 - sectionExplanation', async () => {
    expect(await getSectionIndexForCardNum(5, sectionExplanation)).toBe(1);
  });
  it('card 5 - sectionAdvice', async () => {
    expect(await getSectionIndexForCardNum(5, sectionAdvice)).toBe(-1);
  });
  it('card 5 - sectionOtherLinksCauses', async () => {
    expect(await getSectionIndexForCardNum(5, sectionOtherLinksCauses)).toBe(-1);
  });
  it('card 5 - sectionOtherLinksEffects', async () => {
    expect(await getSectionIndexForCardNum(5, sectionOtherLinksEffects)).toBe(3);
  });
});


