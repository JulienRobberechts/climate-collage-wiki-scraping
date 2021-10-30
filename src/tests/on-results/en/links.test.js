const { checkMissingLinks } = require("../linksChecks");

const lang = "en";
const langRef = "fr";

describe("Links", () => {
  // FR and EN version are not synchronized at the moment (30/10/2021)
  it.skip("Missing links in English version (compared to FR)", async () => {
    await checkMissingLinks(lang, langRef);
  });
});
