/**
 * @jest-environment node
 */
const { getImageInfo } = require('./getImageInfo');

const lang = 'en';

describe('getImageInfo', () => {
  it('get card 3 Image Info EN', async () => {
    const cardNum = 3;
    const response = await getImageInfo(cardNum, lang);
    expect(response).not.toBeFalsy();
    const pageInfo = response.query.pages['11'];
    expect(pageInfo).not.toBeFalsy();
    expect(pageInfo.title).toEqual(`File:En-en adult card ${cardNum} front.png`);
    expect(pageInfo.imageinfo[0]).not.toBeFalsy();
    // to fix....
    // expect(pageInfo.imageinfo[0].url).toEqual('https://fresqueduclimat.org/wiki/en/xxx');
  });
});
