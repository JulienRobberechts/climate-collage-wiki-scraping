const cleanUpStringBasic = (input) => {
  const newline = /\n/gi;
  const spaces = /\s+/gi;
  const tab = /\t/gi;
  const nbsp = /\u00A0/gi;
  const reference = /\s*\[\d\]/gi;

  return removeSemiColumn(input)
    .replace(reference, "")
    .replace(spaces, " ")
    .replace(tab, " ")
    .replace(nbsp, " ")
    .replace(newline, " ")
    .replace(/:([A-Z])/g, ": $1")
    .replace(/\.([A-Z])/g, ". $1")
    .trim();
};

const removeSemiColumn = (input) => {
  if (input.startsWith(": ")) return input.substring(2);
  return input;
};

const cleanUpStringSpecific = (input) => {
  return cleanUpStringBasic(input)
    .replace("10 15 {\\displaystyle 10^{15}}", "10^15")
    .replace(" 10 21 {\\displaystyle 10^{21}", "10^21")
    .replace("3 , 8 W / m 2 {\\displaystyle 3,8W/m^{2}} ", "3,8 W/m^2")
    .replace("2.8 W / m 2 {\\displaystyle 2.8W/m^{2}} ", "2,8 W/m^2")
    .replace("3 , 1 W / m 2 {\\displaystyle 3,1W/m^{2}}", "3,1 W/m2")
    .replace("3 , 1 W / m 2 {\\displaystyle 3,1W/m^{2}}", "3,1 W/m^2")
    .replace("m 2 {\\displaystyle m^{2}} ", "métre carré")
    .replace("0 , 8 W / m 2 {\\displaystyle -0,8W/m^{2}}", "0,8 W/m^2")
    .replace("2 , 3 W / m 2 {\\displaystyle 2,3W/m^{2}}", "2,3 W/m^2")
    .replace("2 , 6 W / m 2 {\\displaystyle 2,6W/m^{2}}", "2,6 W/m^2");
};

module.exports = { cleanUpStringBasic, cleanUpStringSpecific };
