# Pass by Value vs Pass by Reference in JavaScript

## Overview
Understanding how JavaScript passes values to functions is crucial. JavaScript **always passes by value**, but for objects and arrays, the value being passed is a **reference** to the object. This can lead to confusion about whether objects are passed by value or reference.

## Primitive Types: Pass by Value

Primitive types (numbers, strings, booleans, null, undefined, symbols) are passed by value. A copy of the value is created.

```javascript
function modifyPrimitive(value) {
  value = 10;
  console.log("Inside function:", value); // 10
}

let number = 5;
modifyPrimitive(number);
console.log("Outside function:", number); // 5 (unchanged)
```

### More Examples

```javascript
function changeString(str) {
  str = "Modified";
  console.log("Inside:", str); // "Modified"
}

let text = "Original";
changeString(text);
console.log("Outside:", text); // "Original" (unchanged)

function changeBoolean(bool) {
  bool = false;
  console.log("Inside:", bool); // false
}

let flag = true;
changeBoolean(flag);
console.log("Outside:", flag); // true (unchanged)
```

## Objects and Arrays: Pass by Value of Reference

For objects and arrays, JavaScript passes the **value of the reference**. This means:
- Modifying properties/elements affects the original
- Reassigning the parameter doesn't affect the original

### Modifying Properties (Affects Original)

```javascript
function modifyObject(obj) {
  obj.age = 25; // Modifying property affects original
  console.log("Inside function:", obj);
  // { name: "John", age: 25 }
}

let person = { name: "John" };
modifyObject(person);
console.log("Outside function:", person);
// { name: "John", age: 25 } (modified!)
```

```javascript
function modifyArray(arr) {
  arr.push(4); // Modifying array affects original
  console.log("Inside function:", arr); // [1, 2, 3, 4]
}

let numbers = [1, 2, 3];
modifyArray(numbers);
console.log("Outside function:", numbers); // [1, 2, 3, 4] (modified!)
```

### Reassigning Parameter (Doesn't Affect Original)

```javascript
function reassignObject(obj) {
  obj = { name: "Jane" }; // Reassignment doesn't affect original
  console.log("Inside function:", obj); // { name: "Jane" }
}

let person = { name: "John" };
reassignObject(person);
console.log("Outside function:", person); // { name: "John" } (unchanged!)
```

```javascript
function reassignArray(arr) {
  arr = []; // Reassignment doesn't affect original
  console.log("Inside function:", arr); // []
}

let numbers = [1, 2, 3];
reassignArray(numbers);
console.log("Outside function:", numbers); // [1, 2, 3] (unchanged!)
```

## Visual Explanation

```javascript
// Primitive: value is copied
let a = 5;
let b = a;  // b gets a copy of 5
b = 10;     // a is still 5

// Object: reference is copied
let obj1 = { x: 1 };
let obj2 = obj1;  // obj2 references same object
obj2.x = 2;       // obj1.x is also 2 (same object!)

// Array: reference is copied
let arr1 = [1, 2, 3];
let arr2 = arr1;  // arr2 references same array
arr2.push(4);     // arr1 is also [1, 2, 3, 4]
```

## Function Parameters

```javascript
// Primitive parameter
function testPrimitive(num) {
  num = 100; // Doesn't affect original
}
let x = 5;
testPrimitive(x);
console.log(x); // 5

// Object parameter
function testObject(obj) {
  obj.value = 100; // Affects original
  obj = {};        // Doesn't affect original (reassignment)
}
let y = { value: 5 };
testObject(y);
console.log(y); // { value: 100 }
```

## Creating Independent Copies

If you need to avoid modifying the original:

```javascript
// Shallow copy for objects
function modifyCopy(obj) {
  const copy = { ...obj }; // Shallow copy
  copy.age = 25; // Doesn't affect original
  return copy;
}

// Deep copy for nested objects
function modifyDeepCopy(obj) {
  const copy = JSON.parse(JSON.stringify(obj)); // Deep copy
  copy.address.city = "NYC"; // Doesn't affect original
  return copy;
}

// Copy for arrays
function modifyArrayCopy(arr) {
  const copy = [...arr]; // Shallow copy
  copy.push(4); // Doesn't affect original
  return copy;
}
```

## Common Mistakes

```javascript
// Mistake: Expecting reassignment to work
function clearArray(arr) {
  arr = []; // Doesn't clear original array!
}

let myArray = [1, 2, 3];
clearArray(myArray);
console.log(myArray); // [1, 2, 3] (still has values!)

// Correct: Modify the array
function clearArrayCorrect(arr) {
  arr.length = 0; // Clears original array
}

let myArray2 = [1, 2, 3];
clearArrayCorrect(myArray2);
console.log(myArray2); // [] (cleared!)
```

## Summary Table

| Type | Passed As | Modifying | Reassigning |
|------|-----------|-----------|-------------|
| **Primitives** | Value (copy) | ❌ Doesn't affect original | ❌ Doesn't affect original |
| **Objects** | Value of reference | ✅ Affects original | ❌ Doesn't affect original |
| **Arrays** | Value of reference | ✅ Affects original | ❌ Doesn't affect original |

## Key Points
- JavaScript **always passes by value**
- For primitives: the value itself is copied
- For objects/arrays: the reference value is copied
- Modifying object/array properties affects the original
- Reassigning the parameter doesn't affect the original
- Use shallow/deep copy if you need independent copies
- Understanding this prevents unexpected behavior in functions

