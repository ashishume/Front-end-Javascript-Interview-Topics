# Type Conversion and Type Coercion in JavaScript

## Overview
JavaScript is a dynamically typed language, meaning variables can change types. **Type Conversion** (explicit) is when you manually convert types, while **Type Coercion** (implicit) is when JavaScript automatically converts types.

## Type Coercion (Implicit Conversion)

Type coercion happens automatically when JavaScript needs to convert values to perform operations.

### String Coercion

```javascript
console.log(1 + "2");        // "12" (number coerced to string)
console.log("2" + undefined); // "2undefined"
console.log("2" + NaN);      // "2NaN"
console.log("Hello" + 5);    // "Hello5"
```

### Number Coercion

```javascript
console.log("2" * 2);        // 4 (string coerced to number)
console.log("2" - 1);        // 1
console.log("10" / 2);       // 5
console.log("5" - "3");      // 2
console.log("Hello" - "hello"); // NaN
```

### Boolean Coercion

```javascript
// Falsy values (coerce to false)
console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean(null));     // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));      // false
console.log(Boolean(false));     // false

// Truthy values (coerce to true)
console.log(Boolean(1));        // true
console.log(Boolean("0"));      // true
console.log(Boolean([]));        // true
console.log(Boolean({}));       // true
```

### Comparison Coercion

```javascript
console.log(1 == "1");      // true (coercion)
console.log(1 === "1");     // false (strict, no coercion)
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(0 == false);    // true
console.log(0 === false);   // false
```

## Type Conversion (Explicit Conversion)

Type conversion is when you manually convert types using functions or methods.

### String Conversion

```javascript
// String() constructor
console.log(String(1 + 2));      // "3"
console.log(String(undefined)); // "undefined"
console.log(String(null));      // "null"
console.log(String(true));       // "true"

// .toString() method
console.log((123).toString());   // "123"
console.log(true.toString());    // "true"
// null.toString();              // TypeError
// undefined.toString();         // TypeError
```

### Number Conversion

```javascript
// Number() constructor
console.log(Number("123"));     // 123
console.log(Number("123.45"));  // 123.45
console.log(Number("abc"));      // NaN
console.log(Number(true));       // 1
console.log(Number(false));      // 0
console.log(Number(null));       // 0
console.log(Number(undefined));  // NaN

// parseInt() - parses integer
console.log(parseInt("123"));    // 123
console.log(parseInt("123.45")); // 123
console.log(parseInt("123abc")); // 123

// parseFloat() - parses floating point
console.log(parseFloat("123.45")); // 123.45
console.log(parseFloat("123.45abc")); // 123.45

// Unary plus operator
console.log(+"123");             // 123
console.log(+"123.45");         // 123.45
```

### Boolean Conversion

```javascript
// Boolean() constructor
console.log(Boolean(0));         // false
console.log(Boolean(1));         // true
console.log(Boolean(""));        // false
console.log(Boolean("0"));       // true
console.log(Boolean([]));        // true
console.log(Boolean({}));        // true

// Double negation (!!)
console.log(!!0);                // false
console.log(!!1);                // true
console.log(!!"");               // false
```

### Object to Primitive Conversion

```javascript
// valueOf() and toString()
const obj = {
  valueOf() {
    return 42;
  },
  toString() {
    return "forty-two";
  }
};

console.log(String(obj));  // "forty-two" (toString)
console.log(Number(obj));  // 42 (valueOf)
console.log(obj + "");     // "forty-two" (string context)
console.log(+obj);         // 42 (number context)
```

## Common Coercion Scenarios

### Addition vs Other Operators

```javascript
// Addition coerces to string
console.log(1 + "2");      // "12"
console.log(1 + 2);        // 3

// Other operators coerce to number
console.log("2" * 2);      // 4
console.log("2" - 1);      // 1
console.log("2" / 2);      // 1
```

### Loose vs Strict Equality

```javascript
// Loose equality (==) - allows coercion
console.log(1 == "1");           // true
console.log(0 == false);         // true
console.log(null == undefined);  // true
console.log("" == 0);            // true

// Strict equality (===) - no coercion
console.log(1 === "1");          // false
console.log(0 === false);       // false
console.log(null === undefined); // false
console.log("" === 0);          // false
```

### Array Coercion

```javascript
console.log([] + []);      // "" (empty string)
console.log([] + {});      // "[object Object]"
console.log({} + []);      // "[object Object]"
console.log([1, 2] + [3, 4]); // "1,23,4"
```

## Best Practices

1. **Use strict equality (`===`)**: Avoids unexpected coercion
2. **Explicit conversion**: Use `Number()`, `String()`, `Boolean()` when needed
3. **Be aware of falsy values**: Understand what coerces to false
4. **Check types explicitly**: Use `typeof` when needed

```javascript
// Good: Explicit conversion
const num = Number(userInput);
if (isNaN(num)) {
  console.error("Invalid number");
}

// Good: Strict equality
if (value === null) {
  // handle null
}

// Avoid: Relying on coercion
if (value == null) { // Also matches undefined
  // might not be what you want
}
```

## Key Points
- **Type Coercion**: Automatic, implicit conversion by JavaScript
- **Type Conversion**: Manual, explicit conversion by developer
- Coercion happens in operations like `+`, `==`, comparisons
- Use strict equality (`===`) to avoid unexpected coercion
- Explicit conversion with `Number()`, `String()`, `Boolean()` is clearer
- Understand falsy values: `0`, `""`, `null`, `undefined`, `NaN`, `false`

