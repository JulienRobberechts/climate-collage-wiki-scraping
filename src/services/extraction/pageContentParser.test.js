const { getContent } = require('../fileServices/readFile');
const { parseBackDescription, parseExplanation } = require('./pageContentParser');

const cardContent1FilePath = './src/tests/data/carte1.html';
const cardContent1Section1FilePath = './src/tests/data/carte1-1.html';
const cardContent3FilePath = './src/tests/data/carte3-0.html';

describe('parse BackDescription', () => {
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
});

describe('parse Explanation', () => {
  it('parse explanation card 1', async () => {
    const content = await getContent(cardContent1Section1FilePath);
    const result = parseExplanation(content);
    expect(result).toMatchSnapshot();
  });
});
