/**
 * @jest-environment node
 */
const { downloadFile } = require('./downloadFile');
const fs = require('fs');

const filePathTest = '/home/julien/_sandbox/climate-collage/climate-collage-wiki-scraping/tmp/tmp-img.png';

describe('downloadFile', () => {
  beforeAll(() => {
    deleteFileTest();
  });
  afterAll(() => {
    deleteFileTest();
  });

  it('should download a File', async () => {
    const url = 'https://fresqueduclimat.org/wiki/en/images_en/8/85/En-en_adult_card_7_front.png';
    deleteFileTest();
    await downloadFile(url, filePathTest);
    const exists = fs.existsSync(filePathTest);
    expect(exists).toBe(true);
  });

  const deleteFileTest = () => {
    if (fs.existsSync(filePathTest))
      fs.unlinkSync(filePathTest);
  }
});
