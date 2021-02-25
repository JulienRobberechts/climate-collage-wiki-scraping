const { getContent } = require('../fileServices/readFile');
const { parsePageContent } = require('./pageContentParser');

const cardContent1FilePath = './src/tests/data/carte1.html';

describe('parsePageContent', () => {
  it('read', async () => {
    const content = await getContent(cardContent1FilePath);
    expect(content).toMatch(/modifier le wikicode/gm);
  });
  it('parse', async () => {
    const content = await getContent(cardContent1FilePath);
    const result = parsePageContent(content);
    expect(result).toStrictEqual({
      causes: [
      ],
      consequences: [
        "/wiki/index.php?title=Fr-fr_adulte_carte_2_industrie",
        "/wiki/index.php?title=Fr-fr_adulte_carte_3_b%C3%A2timent",
        "/wiki/index.php?title=Fr-fr_adulte_carte_4_transport",
        "/wiki/index.php?title=Fr-fr_adulte_carte_8_agriculture",
      ],
    });
  });
});
