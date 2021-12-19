const { getObject } = require("../../services/utils/fileServices/readFile");
const linksResultsFilePath = (lang) =>
  `./data/results/cards/${lang}/links.json`;

module.exports = {
  checkMissingLinks: async (langCheck, langRef) => {
    const linksRef = await getObject(linksResultsFilePath(langRef));
    const linksTar = await getObject(linksResultsFilePath(langCheck));

    const missingLinks = linksRef.filter(
      (linkRef) => !hasSimilarLink(linkRef, linksTar)
    );
    if (missingLinks.length > 0) {
      const validLinks = missingLinks.filter((l) => l.status === "valid");
      const optionalLinks = missingLinks.filter((l) => l.status === "optional");
      const invalidLinks = missingLinks.filter((l) => l.status === "invalid");

      if (validLinks.length > 0) {
        console.log(
          `Missing VALID links in '${langCheck}' version: ${validLinks.length}`
        );
        console.log(validLinks);
      }
      if (optionalLinks.length > 0) {
        console.log(
          `Missing OPTIONAL links in '${langCheck}' version: ${optionalLinks.length}`
        );
        console.log(optionalLinks);
      }
      if (invalidLinks.length > 0) {
        console.log(
          `Missing INVALID links in '${langCheck}' version: ${invalidLinks.length}`
        );
        console.log(invalidLinks);
      }
    }

    expect(missingLinks.length).toBe(0);
  },
};

const hasSimilarLink = (link, linksList) => {
  return !!getSimilarLink(link, linksList);
};

const getSimilarLink = (link, linksList) => {
  if (!linksList || !link) throw new Error("invalid check in hasSimilarLink");
  const similarLink = linksList.find((l) => linksAreSimilar(link, l));
  return similarLink;
};

const linksAreSimilar = (linkA, linkB) => {
  if (!linkA || !linkA.fromNum || !linkA.toNum || !linkA.status)
    throw new Error("invalid link A");
  if (!linkB || !linkB.fromNum || !linkB.toNum || !linkB.status)
    throw new Error("invalid link B");

  return (
    linkA.fromNum === linkB.fromNum &&
    linkA.toNum === linkB.toNum &&
    linkA.status === linkB.status
  );
};
