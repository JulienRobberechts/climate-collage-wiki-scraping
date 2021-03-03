const { getContent } = require('../../utils/fileServices/readFile');
const { parseMainCausesEffects } = require('./mainCausesEffectsHtmlParser');

const cardContent1FilePath = './src/tests/data/carte1.html';
const cardContent6FilePath = './src/tests/data/carte6-0.html';

describe('parse main Causes and Effects', () => {
  it('parse CausesEffects card 1', async () => {
    const content = await getContent(cardContent1FilePath);
    const result = parseMainCausesEffects(content);
    expect(result).toStrictEqual({
      causes: [
      ],
      effects: [
        "/wiki/index.php?title=Fr-fr_adulte_carte_2_industrie",
        "/wiki/index.php?title=Fr-fr_adulte_carte_3_b%C3%A2timent",
        "/wiki/index.php?title=Fr-fr_adulte_carte_4_transport",
        "/wiki/index.php?title=Fr-fr_adulte_carte_8_agriculture",
      ],
    });
  });
  it('parse CausesEffects card 6', async () => {
    const content = await getContent(cardContent6FilePath);
    const result = parseMainCausesEffects(content);
    expect(result).toStrictEqual({
      causes: [
        "/wiki/index.php?title=Fr-fr_adulte_carte_8_agriculture",
      ],
      effects: [
        "/wiki/index.php?title=Fr-fr_adulte_carte_7_%C3%A9missions_de_co2",
      ],
    });
  });
});
