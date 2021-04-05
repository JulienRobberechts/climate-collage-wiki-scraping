/**
 * @jest-environment node
 */
const { getImageInfo } = require('./getImageInfo');

describe('getImageInfo', () => {
  it('get carte_3', async () => {
    const cardNum = 3;
    const response = await getImageInfo(cardNum);
    expect(response).not.toBeFalsy();
    const pageInfo = response.query.pages['15'];
    expect(pageInfo).not.toBeFalsy();
    expect(pageInfo.title).toEqual(`Fichier:Fr-fr adulte carte ${cardNum} recto.png`);
    expect(pageInfo.imageinfo[0]).not.toBeFalsy();
    // to fix....
    // expect(pageInfo.imageinfo[0].url).toEqual('https://fresqueduclimat.org/wiki/en/xxx');
  });
});
