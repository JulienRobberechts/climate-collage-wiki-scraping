const { getContent } = require('../../tests/readFile');
const { parseImageInfo } = require('./imageInfoParser');

const imageInfo1FilePath = './src/tests/data/image1.json';
const imageInfo3FilePath = './src/tests/data/image3.json';

describe('parseImageInfo', () => {
  it('read', async () => {
    const content = await getContent(imageInfo3FilePath);
    const data = JSON.parse(content);
    expect(data.query.pages['15'].pageid).toBe(15);
  });
  it('parse image 1', async () => {
    const content = await getContent(imageInfo1FilePath);
    const data = JSON.parse(content);
    const result = parseImageInfo(data);
    expect(result).toStrictEqual({ url: "https://fresqueduclimat.org/wiki/images/0/01/Fr-fr_adulte_carte_1_recto.png" });
  });
  it('parse image 3', async () => {
    const content = await getContent(imageInfo3FilePath);
    const data = JSON.parse(content);
    const result = parseImageInfo(data);
    expect(result).toStrictEqual({ url: "https://fresqueduclimat.org/wiki/images/6/60/Fr-fr_adulte_carte_3_recto.png" });
  });
});
