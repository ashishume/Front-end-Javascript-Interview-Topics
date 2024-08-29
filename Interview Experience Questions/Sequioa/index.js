// console.log(convertToJSON("H2O"));
// console.log(convertToJSON("C6H12"));
// console.log(convertToJSON("COOH"));
// console.log(convertToJSON("CH3COOH"));

function convertToJSON(formula) {
  const elementsCounts = new Map();
  let i = 0;
  while (i < formula.length) {
    let element = formula[i];
    i++;
    let counterStr = "";
    while (i < formula.length && !isNaN(formula[i])) {
      counterStr += formula[i];
      i++;
    }
    const count = counterStr === "" ? 1 : parseInt(counterStr);

    if (elementsCounts.has(element)) {
      elementsCounts.set(element, elementsCounts.get(element) + count);
    } else {
      elementsCounts.set(element, count);
    }
  }
  return elementsCounts;
}

console.log(convertToJSON("H2O"));
console.log(convertToJSON("C6H12"));
console.log(convertToJSON("COOH"));
console.log(convertToJSON("CH3COOH"));

// “Ashish Debnath”.repeatify(3) —> “AshishAshishAshish”

String.prototype.repeatify = (times) => {
  return new Array(times + 1).join(this);
};

console.log("Ashish Debnath".repeatify(3));
