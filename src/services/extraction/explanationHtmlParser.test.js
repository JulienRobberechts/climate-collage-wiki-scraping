const { getContent } = require('../fileServices/readFile');
const { parseExplanation } = require('./explanationHtmlParser');

const cardContent1Section1FilePath = './src/tests/data/carte1-1.html';

describe('parse Explanation', () => {
  it('parse explanation card 1', async () => {
    const content = await getContent(cardContent1Section1FilePath);
    const result = parseExplanation(content);
    expect(result).toMatchSnapshot();
  });
});
