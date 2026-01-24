# Recursive Functions in JavaScript

## Overview
A recursive function is a function that calls itself during its execution. Recursion is a powerful programming technique that allows you to solve complex problems by breaking them down into smaller, similar subproblems. It's particularly useful for problems that have a natural recursive structure, such as tree traversal, factorial calculation, and searching algorithms.

## Basic Structure

Every recursive function needs:
1. **Base Case**: A condition that stops the recursion
2. **Recursive Case**: The function calls itself with modified parameters

```javascript
function recursiveFunction(parameter) {
  // Base case - stops recursion
  if (baseCondition) {
    return baseValue;
  }
  
  // Recursive case - calls itself
  return recursiveFunction(modifiedParameter);
}
```

## Simple Examples

### Factorial
```javascript
function factorial(n) {
  // Base case
  if (n <= 1) {
    return 1;
  }
  
  // Recursive case
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

### Fibonacci Sequence
```javascript
function fibonacci(n) {
  // Base cases
  if (n <= 1) {
    return n;
  }
  
  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(7)); // 13
```

## Real-World Example: Pagination

```javascript
// Making recursive function call to implement pagination for getting desired result
let getNameData;
let currentPageNumber = 1;

const getCountryCodeName = (code) => {
  fetch(
    `https://jsonmock.hackerrank.com/api/countries?page=${currentPageNumber}`
  )
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".loader").style.display = "block";
      
      if (data.data.length) {
        data.data.map((value) => {
          if (value.alpha2Code == code) {
            getNameData = value.name;
            document.querySelector(".loader").style.display = "none";
            console.log("insideFunc==>", getNameData);
            return getNameData;
          }
        });
      }
      
      // Recursive call if data not found
      if (!getNameData) {
        currentPageNumber++;
        getCountryCodeName(code); // Recursive call
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

document.querySelector("#root").addEventListener("click", (e) => {
  getCountryCodeName("SM");
});
```

## Common Recursive Patterns

### 1. Array Sum
```javascript
function sumArray(arr) {
  if (arr.length === 0) {
    return 0; // Base case
  }
  return arr[0] + sumArray(arr.slice(1)); // Recursive case
}

console.log(sumArray([1, 2, 3, 4, 5])); // 15
```

### 2. Count Elements
```javascript
function countElements(arr) {
  if (arr.length === 0) {
    return 0;
  }
  return 1 + countElements(arr.slice(1));
}
```

### 3. Find Maximum
```javascript
function findMax(arr) {
  if (arr.length === 1) {
    return arr[0];
  }
  const maxOfRest = findMax(arr.slice(1));
  return arr[0] > maxOfRest ? arr[0] : maxOfRest;
}
```

### 4. Reverse String
```javascript
function reverseString(str) {
  if (str.length <= 1) {
    return str;
  }
  return reverseString(str.slice(1)) + str[0];
}

console.log(reverseString("hello")); // "olleh"
```

## Tree Traversal

### Depth-First Search (DFS)
```javascript
function traverseTree(node) {
  if (!node) {
    return; // Base case
  }
  
  console.log(node.value);
  traverseTree(node.left);  // Recursive call
  traverseTree(node.right); // Recursive call
}
```

### Directory Traversal
```javascript
function traverseDirectory(dir) {
  console.log(dir.name);
  
  if (dir.children) {
    dir.children.forEach(child => {
      traverseDirectory(child); // Recursive call
    });
  }
}
```

## Flattening Nested Arrays

```javascript
function flattenArray(arr) {
  let result = [];
  
  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item)); // Recursive call
    } else {
      result.push(item);
    }
  }
  
  return result;
}

console.log(flattenArray([1, [2, [3, 4], 5], 6])); // [1, 2, 3, 4, 5, 6]
```

## Binary Search

```javascript
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1; // Base case - not found
  }
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    return mid; // Base case - found
  }
  
  if (arr[mid] > target) {
    return binarySearch(arr, target, left, mid - 1); // Recursive call
  } else {
    return binarySearch(arr, target, mid + 1, right); // Recursive call
  }
}
```

## Tail Recursion

Tail recursion is when the recursive call is the last operation in the function. Some languages optimize this, but JavaScript doesn't automatically optimize tail calls.

```javascript
// Tail recursive factorial
function factorialTail(n, acc = 1) {
  if (n <= 1) {
    return acc;
  }
  return factorialTail(n - 1, n * acc);
}
```

## Memoization with Recursion

To optimize recursive functions that recalculate the same values:

```javascript
function memoizedFibonacci(n, memo = {}) {
  if (n in memo) {
    return memo[n];
  }
  
  if (n <= 1) {
    return n;
  }
  
  memo[n] = memoizedFibonacci(n - 1, memo) + memoizedFibonacci(n - 2, memo);
  return memo[n];
}
```

## Common Pitfalls

### 1. Missing Base Case
```javascript
// ❌ Infinite recursion - no base case
function infiniteLoop(n) {
  return infiniteLoop(n - 1);
}

// ✅ Correct - has base case
function finiteLoop(n) {
  if (n <= 0) return;
  return finiteLoop(n - 1);
}
```

### 2. Not Modifying Parameters
```javascript
// ❌ Will never reach base case
function badRecursion(n) {
  if (n <= 0) return;
  return badRecursion(n); // Same parameter!
}

// ✅ Correct - modifies parameter
function goodRecursion(n) {
  if (n <= 0) return;
  return goodRecursion(n - 1);
}
```

### 3. Stack Overflow
Deep recursion can cause stack overflow errors:

```javascript
// May cause stack overflow for large numbers
function deepRecursion(n) {
  if (n <= 0) return;
  return deepRecursion(n - 1);
}

// Solution: Use iterative approach or increase stack size
function iterativeVersion(n) {
  while (n > 0) {
    n--;
  }
}
```

## When to Use Recursion

### Use Recursion When:
- Problem has natural recursive structure (trees, graphs)
- Solution is more elegant with recursion
- Problem can be broken into similar subproblems
- Depth is limited and predictable

### Use Iteration When:
- Performance is critical
- Very deep recursion is needed
- Stack overflow is a concern
- Iterative solution is simpler

## Best Practices

1. **Always define base case first**: Prevents infinite recursion
2. **Ensure parameters change**: Each recursive call should move toward base case
3. **Use memoization**: For functions that recalculate same values
4. **Consider stack depth**: Be aware of maximum call stack size
5. **Test with edge cases**: Empty inputs, single elements, etc.
6. **Document base case**: Make it clear when recursion stops

## Converting Recursion to Iteration

```javascript
// Recursive
function factorialRecursive(n) {
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}

// Iterative
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
```
