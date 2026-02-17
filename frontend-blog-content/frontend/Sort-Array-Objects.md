# Sort Array of Objects in JavaScript

## Overview
Sorting arrays of objects is a common task in JavaScript. You can sort objects by one or multiple properties, in ascending or descending order, and handle various data types. The `Array.sort()` method with custom comparison functions is the primary tool for this.

## Basic Sorting

```javascript
const array = [
  { name: "John", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 },
  { name: "Alice", age: 30 },
];

function sortArrayObjects(arr) {
  return arr.sort((a, b) => {
    // If names are different, sort by name
    if (a.name !== b.name) {
      return a.name.toLowerCase().localeCompare(b.name);
    } else {
      // If names are the same, sort by age
      return a.age - b.age;
    }
  });
}

console.log(sortArrayObjects(array));
// Result: Sorted by name (ascending), then by age (ascending) for same names
```

## Single Property Sorting

### Sort by String Property (Ascending)
```javascript
const users = [
  { name: "John", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
];

// Sort by name (ascending)
users.sort((a, b) => a.name.localeCompare(b.name));
```

### Sort by Number Property (Ascending)
```javascript
// Sort by age (ascending)
users.sort((a, b) => a.age - b.age);
```

### Sort by Number Property (Descending)
```javascript
// Sort by age (descending)
users.sort((a, b) => b.age - a.age);
```

## Multi-Property Sorting

```javascript
function sortByMultipleProperties(arr, properties) {
  return arr.sort((a, b) => {
    for (const prop of properties) {
      const { key, order = 'asc' } = typeof prop === 'string' 
        ? { key: prop, order: 'asc' } 
        : prop;
      
      if (a[key] < b[key]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return order === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });
}

// Usage
const sorted = sortByMultipleProperties(array, [
  { key: 'name', order: 'asc' },
  { key: 'age', order: 'desc' }
]);
```

## Advanced Sorting Functions

### Generic Sort Function
```javascript
function sortObjects(arr, sortConfig) {
  return arr.sort((a, b) => {
    for (const config of sortConfig) {
      const { key, order = 'asc', type = 'auto' } = config;
      
      let aVal = a[key];
      let bVal = b[key];
      
      // Handle null/undefined
      if (aVal == null && bVal == null) continue;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      
      // Type-specific comparison
      let comparison = 0;
      if (type === 'number' || (type === 'auto' && typeof aVal === 'number')) {
        comparison = aVal - bVal;
      } else if (type === 'date' || (type === 'auto' && aVal instanceof Date)) {
        comparison = aVal.getTime() - bVal.getTime();
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }
      
      if (comparison !== 0) {
        return order === 'asc' ? comparison : -comparison;
      }
    }
    return 0;
  });
}
```

### Case-Insensitive String Sorting
```javascript
function sortByStringCaseInsensitive(arr, key) {
  return arr.sort((a, b) => {
    return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
  });
}
```

### Date Sorting
```javascript
function sortByDate(arr, key) {
  return arr.sort((a, b) => {
    return new Date(a[key]) - new Date(b[key]);
  });
}
```

## Common Sorting Patterns

### Pattern 1: Sort by Multiple Criteria
```javascript
const products = [
  { name: "Laptop", price: 1000, rating: 4.5 },
  { name: "Phone", price: 800, rating: 4.8 },
  { name: "Tablet", price: 600, rating: 4.5 }
];

// Sort by rating (desc), then by price (asc)
products.sort((a, b) => {
  if (a.rating !== b.rating) {
    return b.rating - a.rating; // Descending
  }
  return a.price - b.price; // Ascending
});
```

### Pattern 2: Custom Sort Order
```javascript
const statusOrder = { 'pending': 1, 'processing': 2, 'completed': 3, 'cancelled': 4 };

const orders = [
  { id: 1, status: 'completed' },
  { id: 2, status: 'pending' },
  { id: 3, status: 'processing' }
];

orders.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
```

### Pattern 3: Nested Property Sorting
```javascript
const users = [
  { name: "John", address: { city: "New York", zip: 10001 } },
  { name: "Alice", address: { city: "Boston", zip: 02101 } }
];

users.sort((a, b) => {
  return a.address.city.localeCompare(b.address.city);
});
```

## Immutable Sorting

```javascript
// Create a new sorted array without mutating original
function sortImmutable(arr, compareFn) {
  return [...arr].sort(compareFn);
}

const sorted = sortImmutable(users, (a, b) => a.age - b.age);
```

## Performance Considerations

### For Large Arrays
```javascript
// Use indexed sorting for better performance
function sortLargeArray(arr, key) {
  // Create index array
  const indices = arr.map((_, i) => i);
  
  // Sort indices based on values
  indices.sort((a, b) => {
    const aVal = arr[a][key];
    const bVal = arr[b][key];
    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
  });
  
  // Return sorted array
  return indices.map(i => arr[i]);
}
```

## Real-World Examples

### Example 1: E-commerce Product Sorting
```javascript
const products = [
  { name: "Laptop", price: 1000, inStock: true, rating: 4.5 },
  { name: "Phone", price: 800, inStock: false, rating: 4.8 },
  { name: "Tablet", price: 600, inStock: true, rating: 4.2 }
];

// Sort: in stock first, then by rating, then by price
products.sort((a, b) => {
  // In stock items first
  if (a.inStock !== b.inStock) {
    return b.inStock - a.inStock;
  }
  // Higher rating first
  if (a.rating !== b.rating) {
    return b.rating - a.rating;
  }
  // Lower price first
  return a.price - b.price;
});
```

### Example 2: User List Sorting
```javascript
const users = [
  { name: "John", role: "admin", lastLogin: new Date("2024-01-15") },
  { name: "Alice", role: "user", lastLogin: new Date("2024-01-20") },
  { name: "Bob", role: "admin", lastLogin: new Date("2024-01-10") }
];

// Sort: admins first, then by last login (most recent first)
users.sort((a, b) => {
  const roleOrder = { admin: 1, user: 2 };
  if (roleOrder[a.role] !== roleOrder[b.role]) {
    return roleOrder[a.role] - roleOrder[b.role];
  }
  return b.lastLogin - a.lastLogin;
});
```

## Utility Functions

### Reusable Sort Function
```javascript
class ArraySorter {
  static by(key, order = 'asc') {
    return (a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    };
  }
  
  static byMultiple(config) {
    return (a, b) => {
      for (const { key, order = 'asc' } of config) {
        const comparison = this.by(key, order)(a, b);
        if (comparison !== 0) return comparison;
      }
      return 0;
    };
  }
}

// Usage
users.sort(ArraySorter.by('age', 'desc'));
users.sort(ArraySorter.byMultiple([
  { key: 'name', order: 'asc' },
  { key: 'age', order: 'desc' }
]));
```

## Best Practices

1. **Use localeCompare for Strings**: Handles internationalization correctly
2. **Handle Null/Undefined**: Check for null/undefined values before sorting
3. **Immutable Sorting**: Create new arrays if you need to preserve original
4. **Type Safety**: Ensure consistent data types for reliable sorting
5. **Performance**: Consider indexed sorting for very large arrays
6. **Case Sensitivity**: Use toLowerCase() for case-insensitive string sorting

## Common Mistakes

### Mistake 1: Not Returning Numbers
```javascript
// ❌ Wrong
arr.sort((a, b) => a.age > b.age);

// ✅ Correct
arr.sort((a, b) => a.age - b.age);
```

### Mistake 2: Mutating Original Array
```javascript
// ❌ Mutates original
const sorted = arr.sort((a, b) => a.age - b.age);

// ✅ Creates new array
const sorted = [...arr].sort((a, b) => a.age - b.age);
```

### Mistake 3: Not Handling Null Values
```javascript
// ❌ May cause errors
arr.sort((a, b) => a.property - b.property);

// ✅ Handles null
arr.sort((a, b) => {
  if (a.property == null) return 1;
  if (b.property == null) return -1;
  return a.property - b.property;
});
```
