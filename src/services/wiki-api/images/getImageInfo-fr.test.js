/**
 * @jest-environment node
 */
const { getImageInfo } = require('./getImageInfo');

const lang = 'fr';

describe('getImageInfo', () => {
  it('get carte_3', async () => {
    const cardNum = 3;
    const response = await getImageInfo(cardNum, lang);
    expect(response).not.toBeFalsy();
    const pageInfo = response.query.pages['15'];
    expect(pageInfo).not.toBeFalsy();
    expect(pageInfo.title).toEqual(`Fichier:Fr-fr adulte carte ${cardNum} recto.png`);
    expect(pageInfo.imageinfo[0]).not.toBeFalsy();
    expect(pageInfo.imageinfo[0].url).toEqual('https://fresqueduclimat.org/wiki/images/6/60/Fr-fr_adulte_carte_3_recto.png');
  });
});
