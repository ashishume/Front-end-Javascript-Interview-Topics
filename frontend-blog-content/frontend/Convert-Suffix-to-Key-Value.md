# Convert Suffix to Key-Value Pair in JavaScript

## Overview
Converting suffix notation (like chemical formulas) to key-value pairs involves parsing a string where elements are followed by optional numeric suffixes, and creating an object mapping each element to its count. This pattern is useful for parsing formulas, expressions, and structured strings.

## Basic Implementation

```javascript
/**
 * Convert chemistry elements into JSON objects
 * Basically chemistry elements suffix into key value pair
 * @param {string} formula
 * @returns {object} JSON object
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

// Examples
console.log(convertToJSON("H2O"));      // {H: 2, O: 1}
console.log(convertToJSON("C6H12"));    // {C: 6, H: 12}
console.log(convertToJSON("COOH"));     // {C: 1, O: 2, H: 1}
console.log(convertToJSON("CH3COOH"));  // {C: 2, H: 4, O: 2}
```

## Enhanced Implementation

### With Multi-Character Elements
```javascript
function parseFormula(formula) {
  const counts = {};
  let i = 0;
  
  while (i < formula.length) {
    // Parse element (one or two characters)
    let element = formula[i];
    i++;
    
    // Check for second lowercase letter (e.g., "Ca", "Fe")
    if (i < formula.length && /[a-z]/.test(formula[i])) {
      element += formula[i];
      i++;
    }
    
    // Parse number
    let numStr = '';
    while (i < formula.length && /\d/.test(formula[i])) {
      numStr += formula[i];
      i++;
    }
    
    const count = numStr === '' ? 1 : parseInt(numStr);
    counts[element] = (counts[element] || 0) + count;
  }
  
  return counts;
}
```

## Use Cases

### 1. Chemical Formulas
```javascript
const water = parseFormula("H2O");
const glucose = parseFormula("C6H12O6");
```

### 2. Expression Parsing
```javascript
function parseExpression(expr) {
  // Similar pattern for parsing expressions
}
```

## Best Practices

1. **Handle Edge Cases**: Empty strings, invalid formats
2. **Validate Input**: Check format before parsing
3. **Support Multi-Char**: Handle multi-character elements
4. **Error Handling**: Provide meaningful errors
