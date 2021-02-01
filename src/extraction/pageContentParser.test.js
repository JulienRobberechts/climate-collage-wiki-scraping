const { getContent } = require('../tests/readfile');
const { parsePageContent } = require('./pageContentParser');

describe('jsdom', () => {
  it('read', async () => {
    const content = await getContent();
    expect(content).toMatch(/modifier le wikicode/gm);
  });
  it('parse', async () => {
    const content = await getContent();
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
