const { getContent } = require('../../utils/fileServices/readFile');
const { parseExplanation } = require('./explanationHtmlParser');

// to update those files check manual-calls/get -card-sections.http
const cardContent1Section1FilePath = './src/tests/data/fr/carte1-1.html';

describe('parse Explanation', () => {
  it('parse explanation card 1', async () => {
    const content = await getContent(cardContent1Section1FilePath);
    const result = parseExplanation(content);
    expect(result).toMatchSnapshot();
  });
});
