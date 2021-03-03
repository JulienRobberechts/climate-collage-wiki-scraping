const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { assertEqual, assertMore } = require('./parserAssertions');

module.exports.parseBackDescription = (content, message = '') => {
  const { window: { document } } = new JSDOM(content);
  const paragraphes = document.querySelectorAll("table ~ p");
  assertMore('paragraphes count' + message, paragraphes.length, 1);
  const backDescription = Array.from(paragraphes).reduce((text, p) => text + p.textContent.trim(), '')
  return backDescription;
};

module.exports.parseExplanation = (content, message = '') => {
  const { window: { document } } = new JSDOM(content);
  const blocks = Array.from(document.querySelectorAll("h2 ~ *"));
  const explanation = blocks
    .filter(elementIsNotReferenceNote)
    .map(toText)
    .map(replaceTextReference)
    .reduce(mergeTexts, '');
  return explanation;
};

const elementIsNotReferenceNote = el => el.className !== "mw-references-wrap";
const toText = (el) => el.textContent.trim();
const replaceTextReference = (text) => text.replace('[1]', '').replace('[2]', '');
const mergeTexts = (sum, text) => sum + text;

