const { getContent } = require('../fileServices/readFile');
const { parseListContent } = require('./listContentParser');

const cardListFrFilePath = './src/services/extraction/test-data/list-fr.html';

describe('parseListContent', () => {
  it('parse', async () => {
    const content = await getContent(cardListFrFilePath);
    const cards = parseListContent(content);
    expect(cards).toMatchSnapshot();
    expect(cards[0]).toStrictEqual({
      wikiInternalName: "Fr-fr adulte carte 1 activit\\u00e9s humaines",
      cardNum: 1,
      cardSet: 1,
      title: "Activit\\u00e9s humaines",
      wikiUrl: "/wiki/index.php?title=Fr-fr_adulte_carte_1_activit%C3%A9s_humaines",
    });

    expect(cards[0]).toStrictEqual({
      wikiInternalName: "Fr-fr adulte carte 1 activit\\u00e9s humaines",
      cardNum: 1,
      cardSet: 1,
      title: "Activit\\u00e9s humaines",
      wikiUrl: "/wiki/index.php?title=Fr-fr_adulte_carte_1_activit%C3%A9s_humaines",
    });

    expect(cards.length).toBe(42);
  });
});
