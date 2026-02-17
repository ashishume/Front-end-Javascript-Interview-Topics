# Flatten Array to Nth Level in JavaScript

## Overview
Flattening an array means converting a nested array structure into a single-level array. When you need to flatten to a specific depth (Nth level), you control how many levels deep the flattening should go. This is useful for processing nested data structures while preserving some level of nesting.

## Basic Flattening (One Level)

```javascript
/** Flatten the array by one level */
const arr = [1, 2, 3, [5, 7, 8, [4, 8, 5]]];
const newArr = [].concat(...arr);
// Result: [1, 2, 3, 5, 7, 8, [4, 8, 5]]
```

## Multi-Level Flattening (Recursive)

```javascript
/** Flatten the array by more than 1 levels */
function FlattenMultiLevelArray(value) {
  let result = [];
  for (let i = 0; i < value.length; i++) {
    if (Array.isArray(value[i])) {
      result = result.concat(FlattenMultiLevelArray(value[i]));
    } else {
      result.push(value[i]);
    }
  }
  return result;
}

const levelArr = [1, 2, 3, [5, 7, 8, [4, 8, 5, [1, 2]]]];
const res = FlattenMultiLevelArray(levelArr);
// Result: [1, 2, 3, 5, 7, 8, 4, 8, 5, 1, 2]
```

## Flatten to Specific Depth (Nth Level)

```javascript
function flattenToDepth(arr, depth = 1) {
  if (depth === 0) {
    return arr;
  }
  
  return arr.reduce((acc, val) => {
    if (Array.isArray(val) && depth > 0) {
      return acc.concat(flattenToDepth(val, depth - 1));
    } else {
      return acc.concat(val);
    }
  }, []);
}

// Example
const nested = [1, [2, [3, [4, [5]]]]];
console.log(flattenToDepth(nested, 1)); // [1, 2, [3, [4, [5]]]]
console.log(flattenToDepth(nested, 2)); // [1, 2, 3, [4, [5]]]
console.log(flattenToDepth(nested, 3)); // [1, 2, 3, 4, [5]]
console.log(flattenToDepth(nested, Infinity)); // [1, 2, 3, 4, 5]
```

## Using Array.flat() (ES2019)

```javascript
const arr = [1, [2, [3, [4]]]];

// Flatten one level (default)
arr.flat(); // [1, 2, [3, [4]]]

// Flatten to specific depth
arr.flat(2); // [1, 2, 3, [4]]

// Flatten completely
arr.flat(Infinity); // [1, 2, 3, 4]
```

## Advanced Implementation

```javascript
function flattenArray(arr, depth = Infinity) {
  const result = [];
  
  function flatten(item, currentDepth) {
    if (currentDepth >= depth) {
      result.push(item);
      return;
    }
    
    if (Array.isArray(item)) {
      for (const element of item) {
        flatten(element, currentDepth + 1);
      }
    } else {
      result.push(item);
    }
  }
  
  flatten(arr, 0);
  return result;
}
```

## Using Stack (Iterative Approach)

```javascript
function flattenIterative(arr, depth = Infinity) {
  const stack = arr.map(item => ({ item, depth: 0 }));
  const result = [];
  
  while (stack.length > 0) {
    const { item, depth: currentDepth } = stack.pop();
    
    if (Array.isArray(item) && currentDepth < depth) {
      for (let i = item.length - 1; i >= 0; i--) {
        stack.push({ item: item[i], depth: currentDepth + 1 });
      }
    } else {
      result.push(item);
    }
  }
  
  return result.reverse();
}
```

## Use Cases

### 1. Processing Nested Data
```javascript
const nestedData = [
  { id: 1, tags: ['a', 'b'] },
  { id: 2, tags: ['c', ['d', 'e']] }
];

const flattened = flattenArray(nestedData.map(d => d.tags), 2);
// ['a', 'b', 'c', 'd', 'e']
```

### 2. Combining Arrays
```javascript
const a = [1, 2, 3];
const b = [2, 3, 4, [6, 6, 6]];

console.log(a.concat(...b)); // [1, 2, 3, 2, 3, 4, 6, 6, 6]
```

### 3. Tree to Array Conversion
```javascript
function treeToArray(tree, depth = Infinity) {
  return flattenArray(
    tree.map(node => [node.value, node.children || []]),
    depth
  ).filter(item => !Array.isArray(item));
}
```

### 4. Processing API Responses
```javascript
const apiResponse = {
  users: [
    { name: 'John', hobbies: ['reading', ['coding', 'gaming']] },
    { name: 'Jane', hobbies: ['writing'] }
  ]
};

const allHobbies = flattenArray(
  apiResponse.users.map(u => u.hobbies),
  Infinity
);
```

## Performance Comparison

```javascript
// Recursive (can cause stack overflow for deep nesting)
function flattenRecursive(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) 
      ? acc.concat(flattenRecursive(val))
      : acc.concat(val), 
    []
  );
}

// Iterative (better for deep nesting)
function flattenIterative(arr) {
  const stack = [...arr];
  const result = [];
  
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next);
    }
  }
  
  return result.reverse();
}
```

## Handling Edge Cases

```javascript
function flattenArraySafe(arr, depth = Infinity) {
  if (!Array.isArray(arr)) {
    return [arr];
  }
  
  if (depth < 0) {
    return arr;
  }
  
  const result = [];
  
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flattenArraySafe(item, depth - 1));
    } else {
      result.push(item);
    }
  }
  
  return result;
}

// Handles various edge cases
flattenArraySafe(null); // [null]
flattenArraySafe([1, null, undefined, [2]]); // [1, null, undefined, 2]
flattenArraySafe([]); // []
```

## With Type Preservation

```javascript
function flattenWithTypes(arr, depth = Infinity) {
  const result = [];
  
  function flatten(item, currentDepth) {
    if (currentDepth >= depth || !Array.isArray(item)) {
      result.push(item);
      return;
    }
    
    item.forEach(element => {
      flatten(element, currentDepth + 1);
    });
  }
  
  flatten(arr, 0);
  return result;
}
```

## Best Practices

1. **Use Array.flat()**: For modern environments, use the built-in method
2. **Specify Depth**: Always specify depth to avoid unexpected flattening
3. **Handle Edge Cases**: Check for null, undefined, and empty arrays
4. **Consider Performance**: Use iterative approach for very deep nesting
5. **Preserve Types**: Be aware that flattening doesn't change data types
6. **Test Depth**: Test with various depth values to ensure correct behavior

## Common Patterns

### Pattern 1: Flatten and Filter
```javascript
const nested = [1, [2, null, [3, undefined, 4]]];
const flattened = flattenArray(nested, Infinity)
  .filter(item => item != null);
```

### Pattern 2: Flatten and Map
```javascript
const nested = [[1, 2], [3, [4, 5]]];
const doubled = flattenArray(nested, Infinity)
  .map(n => n * 2);
```

### Pattern 3: Partial Flattening
```javascript
// Keep one level of nesting
const partiallyFlattened = flattenArray(nested, 1);
```
