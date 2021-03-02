const { getContent } = require('../fileServices/readFile');
const { parseCausesEffects, parseBackDescription, parseExplanation } = require('./pageContentParser');

const cardContent1FilePath = './src/tests/data/carte1.html';
const cardContent1Section1FilePath = './src/tests/data/carte1-1.html';
const cardContent1Section1BisFilePath = './src/tests/data/carte1-1bis.html';
const cardContent3FilePath = './src/tests/data/carte3-0.html';

describe('parse Page Content', () => {
  it('read', async () => {
    const content = await getContent(cardContent1FilePath);
    expect(content).toMatch(/modifier le wikicode/gm);
  });
  it('parse CausesEffects card 1', async () => {
    const content = await getContent(cardContent1FilePath);
    const result = parseCausesEffects(content);
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
  it('parse BackDescription card 1', async () => {
    const content = await getContent(cardContent1FilePath);
    const result = parseBackDescription(content);
    expect(result).toStrictEqual("C'est ici que tout commence...");
  });
  it('parse BackDescription card 3', async () => {
    const content = await getContent(cardContent3FilePath);
    const result = parseBackDescription(content);
    expect(result).toMatchSnapshot();
  });

  it('parse explanation card 1', async () => {
    const content = await getContent(cardContent1Section1FilePath);
    const result = parseExplanation(content);
    expect(result).toMatchSnapshot();
  });
});
