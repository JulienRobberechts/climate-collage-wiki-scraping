const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports.parsePageContent = (content, message = '') => {
  const dom = new JSDOM(content);

  const tables = dom.window.document.querySelectorAll("table");
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
  const consequencesCell = contentRow[2];

  const causesAnchors = causesCell.querySelectorAll("li a");
  // assert('causes count' + message, causesAnchors.length, 0);

  const consequencesAnchors = consequencesCell.querySelectorAll("li a");
  // assert('consequences count' + message, consequencesAnchors.length, 4);

  const causes = Array.from(causesAnchors).map(c => c.href);
  const consequences = Array.from(consequencesAnchors).map(c => c.href);

  return {
    causes,
    consequences,
  };
};

const assertEqual = (message, actualNum, expectedNum) => {
  if (actualNum !== expectedNum) { throw new Error(`${message} is '${actualNum}' instead of '${expectedNum}'`); }
}

const assertMore = (message, actualNum, expectedNum) => {
  if (!(actualNum >= expectedNum)) { throw new Error(`${message} is '${actualNum}' instead of '${expectedNum}'`); }
}
