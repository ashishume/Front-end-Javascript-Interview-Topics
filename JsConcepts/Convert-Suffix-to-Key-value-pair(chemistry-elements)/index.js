/**
 * Convert chemisty elements into json objects 
 * Basically chemistry elements suffix into key value pair
 * @param {*} formula 
 * @returns {json object}
 */
function convertToJSON(formula) {
  const elementCounts = {};
  let i = 0;

  while (i < formula.length) {
    const element = formula[i];
    i++;

    // Parse the number after the element, if any
    let countStr = "";
    while (i < formula.length && !isNaN(formula[i])) {
      countStr += formula[i];
      i++;
    }

    const count = countStr === "" ? 1 : parseInt(countStr);

    if (element in elementCounts) {
      elementCounts[element] += count;
    } else {
      elementCounts[element] = count;
    }
  }

  return elementCounts;
}
console.log(convertToJSON("H2O"));
console.log(convertToJSON("C6H12"));
console.log(convertToJSON("COOH"));
console.log(convertToJSON("CH3COOH"));
