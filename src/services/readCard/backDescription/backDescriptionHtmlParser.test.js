const { getContent } = require('../../utils/fileServices/readFile');
const { parseBackDescription } = require('./backDescriptionHtmlParser');

const cardContent1FilePath = './src/tests/data/fr/carte1.html';
const cardContent3FilePath = './src/tests/data/fr/carte3-0.html';

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
