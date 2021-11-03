const { checkMissingLinks } = require("../linksChecksAcrossLanguages");
const { checkMultipleLinkStates } = require("../linksChecksWith2States");

const lang = "en";
const langRef = "fr";

describe("Links", () => {
  it("Missing links in English version (compared to FR)", async () => {
    await checkMissingLinks(lang, langRef);
  });
  it("Links should have a unique state", async () => {
    await checkMultipleLinkStates(lang);
  });
});
