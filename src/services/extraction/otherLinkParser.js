const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports.parseLinks = (content, message = '') => {
  const { window: { document } } = new JSDOM(content);
  const items = Array.from(document.querySelectorAll("h3+ul>li"));
  const cardLinks = items
    .map(parseLink);

  return cardLinks;
};

const parseLink = (listItem) => {
  listItem.child
  const anchor = listItem.querySelector("a");
  const explanation = listItem.textContent
    .replace(anchor.textContent, '');

  return {
    href: anchor.href,
    explanation,
  }
};
