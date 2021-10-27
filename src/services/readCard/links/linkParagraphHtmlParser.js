const jsdom = require("jsdom");
const { cleanUpStringBasic } = require("../../utils/string/cleanUpString");
const { JSDOM } = jsdom;

module.exports.parseLinks = (content, message = "") => {
  const {
    window: { document },
  } = new JSDOM(content);
  const items = Array.from(document.querySelectorAll("ul>li"));
  const cardLinks = items.map(parseLink);

  return cardLinks.filter((l) => !!l);
};

const parseLink = (listItem) => {
  listItem.child;
  const anchor = listItem.querySelector("a");
  // Now links can be listed without anchor (and will be ignored)
  if (!anchor) return null;
  const explanation = listItem.textContent.replace(anchor.textContent, "");

  return {
    href: anchor.href,
    explanation: cleanUpStringBasic(explanation),
  };
};
