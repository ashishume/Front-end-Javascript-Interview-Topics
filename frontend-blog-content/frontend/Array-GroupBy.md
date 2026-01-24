# Array GroupBy Polyfill in JavaScript

## Overview
The `groupBy` method groups array elements based on a provided function. It returns an object where keys are the results of the grouping function and values are arrays of elements that produced that key. This is similar to SQL's GROUP BY clause and is useful for organizing and categorizing data.

## Basic Implementation

```javascript
/**
 * @description Group the array by the given function
 * @param {Function} fn
 * @returns {Object}
 */
Array.prototype.groupBy = function (fn) {
  const result = {};
  for (const item of this) {
    const key = fn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
};
```

## Examples

### Group by String Conversion
```javascript
console.log([1, 2, 3, 4, 5, 6].groupBy(String));
// {
//   "1": [1],
//   "2": [2],
//   "3": [3],
//   "4": [4],
//   "5": [5],
//   "6": [6]
// }
```

### Group by Modulo
```javascript
console.log([1, 2, 3, 4, 5, 6].groupBy((n) => n % 2));
// {
//   "0": [2, 4, 6],
//   "1": [1, 3, 5]
// }
```

## Advanced Implementation

### Using Reduce
```javascript
Array.prototype.groupBy = function (fn) {
  return this.reduce((result, item) => {
    const key = fn(item);
    result[key] = result[key] || [];
    result[key].push(item);
    return result;
  }, {});
};
```

### With Map for Better Performance
```javascript
Array.prototype.groupBy = function (fn) {
  const map = new Map();
  
  for (const item of this) {
    const key = fn(item);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(item);
  }
  
  return Object.fromEntries(map);
};
```

## Use Cases

### 1. Group Objects by Property
```javascript
const users = [
  { name: 'John', age: 25, city: 'New York' },
  { name: 'Jane', age: 30, city: 'London' },
  { name: 'Bob', age: 25, city: 'New York' },
  { name: 'Alice', age: 30, city: 'Paris' }
];

// Group by age
const groupedByAge = users.groupBy(user => user.age);
// {
//   25: [{ name: 'John', age: 25, city: 'New York' }, { name: 'Bob', age: 25, city: 'New York' }],
//   30: [{ name: 'Jane', age: 30, city: 'London' }, { name: 'Alice', age: 30, city: 'Paris' }]
// }

// Group by city
const groupedByCity = users.groupBy(user => user.city);
```

### 2. Group by Multiple Properties
```javascript
Array.prototype.groupByMultiple = function (...fns) {
  return this.reduce((result, item) => {
    const key = fns.map(fn => fn(item)).join('|');
    result[key] = result[key] || [];
    result[key].push(item);
    return result;
  }, {});
};

// Usage
const grouped = users.groupByMultiple(
  user => user.age,
  user => user.city
);
```

### 3. Group by Date
```javascript
const events = [
  { name: 'Event 1', date: new Date('2024-01-15') },
  { name: 'Event 2', date: new Date('2024-01-15') },
  { name: 'Event 3', date: new Date('2024-01-16') }
];

const groupedByDate = events.groupBy(event => 
  event.date.toISOString().split('T')[0]
);
```

### 4. Group by Category
```javascript
const products = [
  { name: 'Laptop', category: 'Electronics', price: 1000 },
  { name: 'Phone', category: 'Electronics', price: 800 },
  { name: 'Book', category: 'Education', price: 20 },
  { name: 'Pen', category: 'Education', price: 2 }
];

const groupedByCategory = products.groupBy(product => product.category);
// {
//   Electronics: [{ name: 'Laptop', ... }, { name: 'Phone', ... }],
//   Education: [{ name: 'Book', ... }, { name: 'Pen', ... }]
// }
```

### 5. Group by Range
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const groupedByRange = numbers.groupBy(n => {
  if (n <= 3) return 'low';
  if (n <= 6) return 'medium';
  return 'high';
});
// {
//   low: [1, 2, 3],
//   medium: [4, 5, 6],
//   high: [7, 8, 9, 10]
// }
```

## Advanced Features

### GroupBy with Transformation
```javascript
Array.prototype.groupByWithTransform = function (fn, transform) {
  return this.reduce((result, item) => {
    const key = fn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(transform ? transform(item) : item);
    return result;
  }, {});
};

// Usage
const grouped = users.groupByWithTransform(
  user => user.age,
  user => user.name // Only store names
);
```

### GroupBy with Aggregation
```javascript
Array.prototype.groupByWithAggregate = function (fn, aggregateFn) {
  return this.reduce((result, item) => {
    const key = fn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {}).mapValues((group, key) => aggregateFn(group, key));
};

// Helper to map object values
Object.prototype.mapValues = function (fn) {
  return Object.fromEntries(
    Object.entries(this).map(([key, value]) => [key, fn(value, key)])
  );
};

// Usage: Group and sum prices
const products = [
  { category: 'Electronics', price: 100 },
  { category: 'Electronics', price: 200 },
  { category: 'Books', price: 20 }
];

const grouped = products.groupByWithAggregate(
  p => p.category,
  (group) => group.reduce((sum, p) => sum + p.price, 0)
);
```

### GroupBy with Count
```javascript
Array.prototype.groupByCount = function (fn) {
  return this.reduce((result, item) => {
    const key = fn(item);
    result[key] = (result[key] || 0) + 1;
    return result;
  }, {});
};

// Usage
const countByAge = users.groupByCount(user => user.age);
// { 25: 2, 30: 2 }
```

## Native Implementation (ES2024)

JavaScript now has a native `groupBy` method (ES2024):

```javascript
// Native implementation (if available)
const grouped = [1, 2, 3, 4, 5, 6].groupBy(n => n % 2);
```

## Performance Considerations

### Using Map (Faster for Large Arrays)
```javascript
Array.prototype.groupByFast = function (fn) {
  const map = new Map();
  
  for (let i = 0; i < this.length; i++) {
    const key = fn(this[i]);
    const group = map.get(key);
    if (group) {
      group.push(this[i]);
    } else {
      map.set(key, [this[i]]);
    }
  }
  
  return Object.fromEntries(map);
};
```

## Real-World Examples

### Example 1: Group Orders by Status
```javascript
const orders = [
  { id: 1, status: 'pending', amount: 100 },
  { id: 2, status: 'completed', amount: 200 },
  { id: 3, status: 'pending', amount: 150 },
  { id: 4, status: 'cancelled', amount: 50 }
];

const ordersByStatus = orders.groupBy(order => order.status);
// {
//   pending: [{ id: 1, ... }, { id: 3, ... }],
//   completed: [{ id: 2, ... }],
//   cancelled: [{ id: 4, ... }]
// }
```

### Example 2: Group Students by Grade
```javascript
const students = [
  { name: 'Alice', grade: 'A', score: 95 },
  { name: 'Bob', grade: 'B', score: 85 },
  { name: 'Charlie', grade: 'A', score: 92 },
  { name: 'David', grade: 'B', score: 88 }
];

const studentsByGrade = students.groupBy(student => student.grade);
```

### Example 3: Group Transactions by Month
```javascript
const transactions = [
  { amount: 100, date: new Date('2024-01-15') },
  { amount: 200, date: new Date('2024-01-20') },
  { amount: 150, date: new Date('2024-02-10') }
];

const transactionsByMonth = transactions.groupBy(transaction => {
  return transaction.date.toLocaleString('default', { month: 'long', year: 'numeric' });
});
```

## Best Practices

1. **Use Meaningful Keys**: Ensure grouping function returns meaningful keys
2. **Handle Null/Undefined**: Consider how to handle null/undefined values
3. **Performance**: Use Map for large arrays
4. **Type Safety**: Ensure consistent key types
5. **Immutable**: Consider creating new arrays instead of modifying original

## Comparison with Other Methods

### vs filter()
- **filter()**: Returns single array matching condition
- **groupBy()**: Returns object with multiple groups

### vs reduce()
- **reduce()**: More flexible but more verbose
- **groupBy()**: Specialized for grouping operations

### vs Map/Set
- **Map/Set**: More efficient for large datasets
- **groupBy()**: More convenient for simple grouping
