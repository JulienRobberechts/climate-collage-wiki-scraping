const { getObject } = require('../../services/utils/fileServices/readFile');
const linksResultsFilePath = (lang) => `./data/results/links-${lang}.json`;


describe('Links', () => {
  it.skip('Missing links in English version (49 error now)', async () => {
    const linksFR = await getObject(linksResultsFilePath('fr'));
    const linksEN = await getObject(linksResultsFilePath('en'));

    const linksFrMissingInEn = linksFR.filter(linkFR => !hasSimilarLink(linkFR, linksEN));

    if (linksFrMissingInEn.length > 0) {
      console.log("Missing links in English version:", linksFrMissingInEn.length);
      const validLinks = linksFrMissingInEn.filter(l => l.status === 'valid');
      const optionalLinks = linksFrMissingInEn.filter(l => l.status === 'optional');
      const invalidLinks = linksFrMissingInEn.filter(l => l.status === 'invalid');
      console.log(` valid=${validLinks.length} optional=${optionalLinks.length} invalid=${invalidLinks.length} `);

      console.log(`Missing VALID links in English version:`);
      console.log(validLinks);
      console.log(`Missing OPTIONAL links in English version:`);
      console.log(optionalLinks);
      console.log(`Missing INVALID links in English version:`);
      console.log(invalidLinks);
    }

    expect(linksFrMissingInEn.length).toBe(0);
  });
  it('Missing links in French version', async () => {
    const linksFr = await getObject(linksResultsFilePath('fr'));
    const linksEn = await getObject(linksResultsFilePath('en'));

    const linksEnMissingInFr = linksEn.filter(linkEn => !hasSimilarLink(linkEn, linksFr));
    if (linksEnMissingInFr.length > 0) {
      console.log("Missing links in French version:", linksEnMissingInFr.length);
      const validLinks = linksEnMissingInFr.filter(l => l.status === 'valid');
      const optionalLinks = linksEnMissingInFr.filter(l => l.status === 'optional');
      const invalidLinks = linksEnMissingInFr.filter(l => l.status === 'invalid');
      console.log(` valid=${validLinks.length} optional=${optionalLinks.length} invalid=${invalidLinks.length} `);

      console.log(`Missing VALID links in English version:`);
      console.log(validLinks);
      console.log(`Missing OPTIONAL links in English version:`);
      console.log(optionalLinks);
      console.log(`Missing INVALID links in English version:`);
      console.log(invalidLinks);
    }
    expect(linksEnMissingInFr.length).toBe(0);
  });
});

const hasSimilarLink = (link, linksList) => {
  return !!getSimilarLink(link, linksList);
}

const getSimilarLink = (link, linksList) => {
  if (!linksList || !link)
    throw new Error('invalid check in hasSimilarLink');
  const similarLink = linksList.find(l => linksAreSimilar(link, l));
  return similarLink;
}

const linksAreSimilar = (linkA, linkB) => {
  if (!linkA || !linkA.fromNum || !linkA.toNum)
    throw new Error('invalid link A');
  if (!linkB || !linkB.fromNum || !linkB.toNum)
    throw new Error('invalid link B');

  return linkA.fromNum === linkB.fromNum && linkA.toNum === linkB.toNum;
}
