const { checkMissingLinks } = require("../linksChecks");

const lang = "fr";
const langRef = "en";

describe("Links", () => {
  // FR and EN version are not synchronized at the moment (30/10/2021)
  it.skip("Missing links in French version (compared to EN)", async () => {
    await checkMissingLinks(lang, langRef);
  });
});
