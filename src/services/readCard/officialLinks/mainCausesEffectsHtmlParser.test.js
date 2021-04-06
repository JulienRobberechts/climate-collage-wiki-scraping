const { getContent } = require('../../utils/fileServices/readFile');
const { parseMainCausesEffects } = require('./mainCausesEffectsHtmlParser');

const cardContent1FilePath = './src/tests/data/fr/carte1.html';
const cardContent6FilePath = './src/tests/data/fr/carte6-0.html';

describe('parse main Causes and Effects', () => {
  it('parse CausesEffects card 1', async () => {
    const content = await getContent(cardContent1FilePath);
    const result = parseMainCausesEffects(content, '', 'fr');
    expect(result).toStrictEqual({
      causes: [],
      effects: [2, 3, 4, 8],
    });
  });
  it('parse CausesEffects card 6', async () => {
    const content = await getContent(cardContent6FilePath);
    const result = parseMainCausesEffects(content, '', 'fr');
    expect(result).toStrictEqual({
      causes: [8],
      effects: [7],
    });
  });
});
