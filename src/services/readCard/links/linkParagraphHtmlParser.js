const jsdom = require("jsdom");
const { cleanUpStringBasic } = require("../../utils/string/cleanUpString");
const { JSDOM } = jsdom;

module.exports.parseLinks = (content, message = "") => {
  const {
    window: { document },
  } = new JSDOM(content);
  const items = Array.from(document.querySelectorAll("ul>li"));
  const cardLinks = items.map(parseLink);

  return cardLinks.filter(linkNotNull);
};

const linkNotNull = (link) => !!link;

const ALLOW_EMPTY_LINKS = true;

const parseLink = (listItem) => {
  const anchor = listItem.querySelector("a");

  if (!anchor) {
    if (ALLOW_EMPTY_LINKS) return null;
    throw Error(`Link with no anchor: ${listItem.textContent}`);
  }

  if (!isValidCardLinkHRef(anchor.href)) return null;

  const explanation = listItem.textContent.replace(anchor.textContent, "");

  return {
    href: anchor.href,
    explanation: cleanUpStringBasic(explanation),
  };
};

const isValidCardLinkHRef = (href) => {
  if (href.includes("/wiki/")) return true;
  if (href.includes("#cite_note")) return false;

  console.warn(`card link is not recognized: "${href}"`);
};
