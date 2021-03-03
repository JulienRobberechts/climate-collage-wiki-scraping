const { getContent } = require('../../utils/fileServices/readFile');
const { parseImageInfoResponse } = require('./imageInfoParser');

const imageInfo1FilePath = './src/services/wiki-api/test-data/image1.json';
const imageInfo3FilePath = './src/services/wiki-api/test-data/image3.json';

describe('parse ImageInfo response', () => {
  it('read', async () => {
    const content = await getContent(imageInfo3FilePath);
    const data = JSON.parse(content);
    expect(data.query.pages['15'].pageid).toBe(15);
  });
  it('parse image 1', async () => {
    const content = await getContent(imageInfo1FilePath);
    const data = JSON.parse(content);
    const result = parseImageInfoResponse(data);
    expect(result).toStrictEqual({ url: "https://fresqueduclimat.org/wiki/images/0/01/Fr-fr_adulte_carte_1_recto.png" });
  });
  it('parse image 3', async () => {
    const content = await getContent(imageInfo3FilePath);
    const data = JSON.parse(content);
    const result = parseImageInfoResponse(data);
    expect(result).toStrictEqual({ url: "https://fresqueduclimat.org/wiki/images/6/60/Fr-fr_adulte_carte_3_recto.png" });
  });
});
