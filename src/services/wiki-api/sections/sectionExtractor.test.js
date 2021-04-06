const { getObject } = require('../../utils/fileServices/readFile');
const { getSectionNames } = require('./sectionNames');
const { getSectionIndex } = require('./sectionExtractor');



async function getSectionIndexForCardNum(cardNum, sectionName) {
  // to update those files check manual-calls/get -card-sections.http
  const sourceFile = `./src/tests/data/fr/section-card-${cardNum}.json`;
  const sections = await getObject(sourceFile);
  return getSectionIndex(sections, sectionName);
};

describe('card 1 get section', () => {
  it('card 1 - sectionMain', async () => {
    expect(await getSectionIndexForCardNum(1, getSectionNames('fr').sectionMain)).toBe(0);
  });
  it('card 1 - sectionDefinition', async () => {
    expect(await getSectionIndexForCardNum(1, getSectionNames('fr').sectionDefinition)).toBe(-1);
  });
  it('card 1 - sectionExplanation', async () => {
    expect(await getSectionIndexForCardNum(1, getSectionNames('fr').sectionExplanation)).toBe(1);
  });
  it('card 1 - sectionAdvice', async () => {
    expect(await getSectionIndexForCardNum(1, getSectionNames('fr').sectionAdvice)).toBe(-1);
  });
  it('card 1 - sectionOptionalCauses', async () => {
    expect(await getSectionIndexForCardNum(1, getSectionNames('fr').sectionOptionalCauses)).toBe(3);
  });
  it('card 1 - sectionOptionalEffects', async () => {
    expect(await getSectionIndexForCardNum(1, getSectionNames('fr').sectionOptionalEffects)).toBe(4);
  });
});

describe('card 6 get section', () => {
  it('card 6 - sectionMain', async () => {
    expect(await getSectionIndexForCardNum(6, getSectionNames('fr').sectionMain)).toBe(0);
  });
  it('card 6 - sectionDefinition', async () => {
    expect(await getSectionIndexForCardNum(6, getSectionNames('fr').sectionDefinition)).toBe(1);
  });
  it('card 6 - sectionExplanation', async () => {
    expect(await getSectionIndexForCardNum(6, getSectionNames('fr').sectionExplanation)).toBe(2);
  });
  it('card 6 - sectionAdvice', async () => {
    expect(await getSectionIndexForCardNum(6, getSectionNames('fr').sectionAdvice)).toBe(3);
  });
  it('card 6 - sectionOptionalCauses', async () => {
    expect(await getSectionIndexForCardNum(6, getSectionNames('fr').sectionOptionalCauses)).toBe(5);
  });
  it('card 6 - sectionOptionalEffects', async () => {
    expect(await getSectionIndexForCardNum(6, getSectionNames('fr').sectionOptionalEffects)).toBe(6);
  });
});

describe('card 5 get section', () => {
  it('card 5 - sectionMain', async () => {
    expect(await getSectionIndexForCardNum(5, getSectionNames('fr').sectionMain)).toBe(0);
  });
  it('card 5 - sectionDefinition', async () => {
    expect(await getSectionIndexForCardNum(5, getSectionNames('fr').sectionDefinition)).toBe(-1);
  });
  it('card 5 - sectionExplanation', async () => {
    expect(await getSectionIndexForCardNum(5, getSectionNames('fr').sectionExplanation)).toBe(1);
  });
  it('card 5 - sectionAdvice', async () => {
    expect(await getSectionIndexForCardNum(5, getSectionNames('fr').sectionAdvice)).toBe(-1);
  });
  it('card 5 - sectionOptionalCauses', async () => {
    expect(await getSectionIndexForCardNum(5, getSectionNames('fr').sectionOptionalCauses)).toBe(-1);
  });
  it('card 5 - sectionOptionalEffects', async () => {
    expect(await getSectionIndexForCardNum(5, getSectionNames('fr').sectionOptionalEffects)).toBe(3);
  });
});


