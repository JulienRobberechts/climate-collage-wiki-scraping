const { checkMissingLinks } = require("../linksChecksAcrossLanguages");

const lang = "en";
const langRef = "fr";

describe("Links", () => {
  it("Missing links in English version (compared to FR)", async () => {
    await checkMissingLinks(lang, langRef);
  });
});
