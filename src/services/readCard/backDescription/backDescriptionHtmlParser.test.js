const { getContent } = require("../../utils/fileServices/readFile");
const { parseBackDescription } = require("./backDescriptionHtmlParser");

// to update those files check manual-calls/get -card-sections.http
const cardContent1FilePath = "./src/tests/data/fr/carte1-first-section.html";
const cardContent3FilePath = "./src/tests/data/fr/carte3-first-section.html";

describe("parse BackDescription", () => {
  it("parse BackDescription card 1", async () => {
    const content = await getContent(cardContent1FilePath);
    const result = parseBackDescription(content);
    expect(result).toContain("que tout commence");
  });
  it("parse BackDescription card 3", async () => {
    const content = await getContent(cardContent3FilePath);
    const result = parseBackDescription(content);
    expect(result).toMatchSnapshot();
  });
});
