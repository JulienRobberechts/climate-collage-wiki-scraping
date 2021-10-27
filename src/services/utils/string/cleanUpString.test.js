const { cleanUpStringBasic } = require("./cleanUpString");

describe("cleanUpStringBasic", () => {
  it('should clean ":"', async () => {
    expect(cleanUpStringBasic(": blabla : bla")).toEqual("blabla : bla");
  });
  it("should clean line return", async () => {
    expect(cleanUpStringBasic("blabla\nbla")).toEqual("blabla bla");
  });
});
