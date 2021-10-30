/**
 * @jest-environment node
 */
const { getLinks, linkIndex, linkStatusIndex } = require("./linksBuilder");

const {
  getCardsFrReferenceByCardNum,
  getLinksEffectFrRef,
  getLinksCauseFrRef,
} = require("../../data-access/cardsRepo");
const { cards1To10, oneTo42 } = require("../../../tests/utils/cardsNumbers");
const lang = "fr";

const checkLinks =
  (linkStatus, linkEffect = true) =>
  async (cardNum) => {
    const card = await getCardsFrReferenceByCardNum(cardNum);
    const expectedLinks = linkEffect
      ? await getLinksEffectFrRef(cardNum, linkStatus)
      : await getLinksCauseFrRef(cardNum, linkStatus);
    const actualLinks = await getLinks(
      cardNum,
      card.wikiId,
      linkStatus,
      `link '${linkStatus}'`,
      lang,
      linkEffect
    );
    expect(linksToCheck(actualLinks)).toStrictEqual(
      linksToCheck(expectedLinks)
    );
  };

const linksToCheck = (links, removeExplanation = true) => {
  // Remove explanation from the comparison for the moment
  const linksWithoutExplanation = removeExplanation
    ? links.map((l) => ({
        ...l,
        explanation: null,
      }))
    : links;
  return linksWithoutExplanation.sort(linkOrder);
};

describe("Valid effects links", () => {
  it.each(oneTo42)("check valid effects on card %i", checkLinks("valid"));
  it("check links valid effects card 1", async () => {
    await checkLinks("valid")(1);
  });
});

describe("Optional effects links", () => {
  it.each(oneTo42)("check optional effects on card %i", checkLinks("optional"));
  it("check links optional effects card 4*", async () => {
    await checkLinks("optional")(4);
  });
});

describe("Invalid effects links", () => {
  it.each(oneTo42)("check invalid effects on card %i", checkLinks("invalid"));
  it("check invalid effects card 35", async () => {
    await checkLinks("invalid")(35);
  });
});

describe("Valid causes", () => {
  it.each(oneTo42)("check valid causes on card %i", checkLinks("valid", false));
  it("card 01", async () => {
    await checkLinks("valid", false)(1);
  });
  // it("card 36", async () => {
  //   await checkLinks("valid", false)(36);
  // });
  // it("card 38", async () => {
  //   await checkLinks("valid", false)(38);
  // });
  // it("card 39", async () => {
  //   await checkLinks("valid", false)(39);
  // });
  // it("card 40", async () => {
  //   await checkLinks("valid", false)(40);
  // });
});

describe("Optional causes", () => {
  it.each(oneTo42)(
    "check optional causes on card %i",
    checkLinks("optional", false)
  );
  it("card 01", async () => {
    await checkLinks("optional", false)(1);
  });
});

describe("Invalid causes", () => {
  it.each(oneTo42)(
    "check invalid causes on card %i",
    checkLinks("invalid", false)
  );
  it("card 01", async () => {
    await checkLinks("invalid", false)(1);
  });
});

describe("linkStatusIndex", () => {
  it("linkStatusIndex valid", () => expect(linkStatusIndex("valid")).toBe(0));
  it("linkStatusIndex optional", () =>
    expect(linkStatusIndex("optional")).toBe(1));
  it("linkStatusIndex invalid", () =>
    expect(linkStatusIndex("invalid")).toBe(2));
});

describe("linkIndex", () => {
  it("linkIndex 8006", () => {
    expect(
      linkIndex({
        fromNum: 8,
        toNum: 3,
        status: "valid",
      })
    ).toBe(8003);
  });
  it("linkIndex 8106", () => {
    expect(
      linkIndex({
        fromNum: 8,
        toNum: 6,
        status: "optional",
      })
    ).toBe(8106);
  });
  it("linkIndex 40205", () => {
    expect(
      linkIndex({
        fromNum: 40,
        toNum: 5,
        status: "invalid",
      })
    ).toBe(40205);
  });
});

const linkOrder = (l1, l2) =>
  100 * l1.fromNum + l1.toNum - (100 * l2.fromNum + l2.toNum);
