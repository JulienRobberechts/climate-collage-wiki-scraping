const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports.parse = (content) => {
  const dom = new JSDOM(content);

  const tables = dom.window.document.querySelectorAll("table");
  assert('table count', tables.length, 1);

  const rows = tables[0].querySelectorAll("tr");
  assert('row count', rows.length, 2);

  const headers = rows[0].querySelectorAll("td");
  assert('row count', headers.length, 3);
  assert('Causes header', headers[0].textContent.trim(), "Causes");
  assert('Conséquences header', headers[2].textContent.trim(), "Cons\\u00e9quences");

  const contentRow = rows[1].querySelectorAll("td");
  assert('contentRow count', contentRow.length, 3);

  const causesCell = contentRow[0];
  const consequencesCell = contentRow[2];

  const causesAnchors = causesCell.querySelectorAll("li a");
  assert('causes count', causesAnchors.length, 0);

  const consequencesAnchors = consequencesCell.querySelectorAll("li a");
  assert('consequences count', consequencesAnchors.length, 4);

  const causes = Array.from(causesAnchors).map(c => c.href);
  const consequences = Array.from(consequencesAnchors).map(c => c.href);

  return {
    causes,
    consequences,
  };
};

const assert = (message, actualNum, expectedNum) => {
  if (actualNum !== expectedNum) throw new Error(`${message} is '${actualNum}' instead of '${expectedNum}'`);
}
