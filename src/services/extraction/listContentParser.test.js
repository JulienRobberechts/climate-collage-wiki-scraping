const { getContent } = require('../fileServices/readFile');
const { parseListContent } = require('./listContentParser');

const content1FilePath = './src/tests/data/list-fr.html';

describe('parseListContent', () => {
  it('parse', async () => {
    const content = await getContent(content1FilePath);
    const cards = parseListContent(content);
    expect(cards).toMatchSnapshot();
    expect(cards[0]).toStrictEqual({
      cardWikiInternalName: "Fr-fr adulte carte 1 activit\\u00e9s humaines",
      cardNum: 1,
      cardSet: 1,
      cardTitle: "Activit\\u00e9s humaines",
      cardWikiUrl: "/wiki/index.php?title=Fr-fr_adulte_carte_1_activit%C3%A9s_humaines",
    });

    expect(cards[0]).toStrictEqual({
      cardWikiInternalName: "Fr-fr adulte carte 1 activit\\u00e9s humaines",
      cardNum: 1,
      cardSet: 1,
      cardTitle: "Activit\\u00e9s humaines",
      cardWikiUrl: "/wiki/index.php?title=Fr-fr_adulte_carte_1_activit%C3%A9s_humaines",
    });

    expect(cards.length).toBe(42);
  });
});
