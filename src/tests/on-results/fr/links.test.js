const { checkMissingLinks } = require("../linksChecksAcrossLanguages");

const lang = "fr";
const langRef = "en";

describe("Links", () => {
  it("Missing links in French version (compared to EN)", async () => {
    await checkMissingLinks(lang, langRef);
  });
});
