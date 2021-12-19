const { getObject } = require("../../services/utils/fileServices/readFile");
const linksResultsFilePath = (lang) =>
  `./data/results/cards/${lang}/links.json`;

module.exports = {
  checkMultipleLinkStates: async (lang) => {
    const links = await getObject(linksResultsFilePath(lang));

    const linksKeys = links.map(linkKey);

    const linksCounts = linksKeys.reduce(
      (acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1,
      }),
      {}
    );
    const linksCountsArray = Object.keys(linksCounts);

    // console.log("linksCountsArray: ", linksCountsArray);

    const invalidLinksCounts = linksCountsArray.filter((count) => count > 1);

    if (invalidLinksCounts.length > 0) {
      console.log("invalidLinksCounts: ", invalidLinksCounts);
    }

    expect(invalidLinksCounts.length).toBe(0);
  },
};

const linkKey = (link) => {
  return `${link.fromNum}->${link.toNum}`;
};
