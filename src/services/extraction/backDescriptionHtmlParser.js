const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { assertEqual, assertMore } = require('../utils/assert/parserAssertions');

module.exports.parseBackDescription = (content, message = '') => {
  const { window: { document } } = new JSDOM(content);
  const paragraphes = document.querySelectorAll("table ~ p");
  assertMore('paragraphes count' + message, paragraphes.length, 1);
  const backDescription = Array.from(paragraphes).reduce((text, p) => text + p.textContent.trim(), '')
  return backDescription;
};
