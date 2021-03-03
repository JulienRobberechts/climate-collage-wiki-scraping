const { getContent } = require('../../utils/fileServices/readFile');
const { parseLinks } = require('./otherLinkHtmlParser');

const linksEffectsFilePathForCard =
  cardNum => `./src/services/readCard/otherPossibleLinks/test-data/linksEffects${cardNum}.html`;

describe('parse other links', () => {
  it('parse optional Effects card 1', async () => {
    const content = await getContent(linksEffectsFilePathForCard(1));
    const links = parseLinks(content);
    expect(links).toMatchSnapshot();
    expect(links.length).toBe(2);
    expect(links[0].explanation).toContain("L'être humain occupe presque");
    expect(links[0].href).toEqual("/wiki/index.php?title=Fr-fr_adulte_carte_25_biodiversit%C3%A9_terrestre");
  });
  it('parse optional Effects card 20', async () => {
    const content = await getContent(linksEffectsFilePathForCard(20));
    const links = parseLinks(content);
    expect(links).toMatchSnapshot();
  });
});
