const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// module.exports.parsePageContent = (content, message = '') => {

//   const { causes, effects } = parseCausesEffects(document, message);
//   const backDescription = parseBackDescription(document, message);

//   return {
//     backDescription,
//     causes,
//     effects,
//   };
// };

module.exports.parseCausesEffects = (content, message = '') => {
  const { window: { document } } = new JSDOM(content);
  const tables = document.querySelectorAll("table");
  assertMore('table count' + message, tables.length, 1);

  const rows = tables[0].querySelectorAll("tr");
  assertEqual('row count' + message, rows.length, 2);

  const headers = rows[0].querySelectorAll("td");
  assertEqual('row count' + message, headers.length, 3);
  assertEqual('Causes header' + message, headers[0].textContent.trim(), "Causes");
  assertEqual('Conséquences header' + message, headers[2].textContent.trim(), "Conséquences");

  const contentRow = rows[1].querySelectorAll("td");
  assertEqual('contentRow count' + message, contentRow.length, 3);

  const causesCell = contentRow[0];
  const effectsCell = contentRow[2];

  const causesAnchors = causesCell.querySelectorAll("li a");
  // assert('causes count' + message, causesAnchors.length, 0);

  const effectsAnchors = effectsCell.querySelectorAll("li a");
  // assert('effects count' + message, effectsAnchors.length, 4);

  const causes = Array.from(causesAnchors).map(c => c.href);
  const effects = Array.from(effectsAnchors).map(c => c.href);

  return {
    causes,
    effects,
  };
};

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
  assertMore('blocks count' + message, blocks.length, 1);
  const explanation = blocks.reduce(mergeElements, '');
  return explanation;
};

const mergeElements = (text, p) => text + p.textContent.trim();

const assertEqual = (message, actualNum, expectedNum) => {
  if (actualNum !== expectedNum) { throw new Error(`${message} is '${actualNum}' instead of '${expectedNum}'`); }
}

const assertMore = (message, actualNum, expectedNum) => {
  if (!(actualNum >= expectedNum)) { throw new Error(`${message} is '${actualNum}' instead of '${expectedNum}'`); }
}
