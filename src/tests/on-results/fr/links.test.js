const { checkMissingLinks } = require("../linksChecksAcrossLanguages");
const { checkMultipleLinkStates } = require("../linksChecksWith2States");

const lang = "fr";
const langRef = "en";

describe("Links", () => {
  it("Missing links in French version (compared to EN)", async () => {
    await checkMissingLinks(lang, langRef);
  });
  it("Links should have a unique state", async () => {
    await checkMultipleLinkStates(lang);
  });
});
