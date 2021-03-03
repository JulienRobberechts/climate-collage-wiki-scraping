const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { assertEqual, assertMore } = require('./parserAssertions');

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

  const effectsAnchors = effectsCell.querySelectorAll("li a");

  const causes = Array.from(causesAnchors).map(c => c.href);
  const effects = Array.from(effectsAnchors).map(c => c.href);

  return {
    causes,
    effects,
  };
};
