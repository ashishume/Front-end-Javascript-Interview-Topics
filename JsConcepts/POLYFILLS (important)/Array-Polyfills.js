/** polyfill for Array.fill() */
Array.prototype.customFill = function (value, start, end) {
  // Check if `this` is null or undefined
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  // Convert `this` to an object
  var obj = Object(this);
  // Convert `obj.length` to an integer
  var len = obj.length >>> 0;
  // Convert start to an integer, if not provided default to 0
  var relativeStart = start >> 0;
  // If start is negative, calculate it from the end of the array
  var k =
    relativeStart < 0
      ? Math.max(len + relativeStart, 0)
      : Math.min(relativeStart, len);
  // Convert end to an integer, if not provided default to length of the array
  var relativeEnd = end === undefined ? len : end >> 0;
  // If end is negative, calculate it from the end of the array
  var final =
    relativeEnd < 0
      ? Math.max(len + relativeEnd, 0)
      : Math.min(relativeEnd, len);
  // Fill the array with the provided value
  while (k < final) {
    obj[k] = value;
    k++;
  }
  // Return the modified array
  return O;
};

// Example usage:
var arr = [1, 2, 3, 4, 5];
console.log(arr.customFill(0, 2, 4)); // Output: [1, 2, 0, 0, 5]
console.log(arr.customFill(6)); // Output: [6, 6, 6, 6, 6]
// ------------------------------------------------------------------------------------
// Polyfill for Array.concat()
Array.prototype.customConcat = function () {
  var newArray = [];
  for (var i = 0; i < this.length; i++) {
    newArray.push(this[i]);
  }
  for (var j = 0; j < arguments.length; j++) {
    if (Array.isArray(arguments[j])) {
      for (var k = 0; k < arguments[j].length; k++) {
        newArray.push(arguments[j][k]);
      }
    } else {
      newArray.push(arguments[j]);
    }
  }
  return newArray;
};
console.log([1, 2, 3].concat(5, 6, 7)); //output 1,2,3,5,6,7

const items = [1, 2, 3, 4, 5, 6];

// ------------------------------------------------------------------------------------

/** For each polyfill */
Array.prototype.customForEach = function (callback, context) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  for (let i = 0; i < this.length; i++) {
    callback.call(context, this[i], i, this);
  }
};

// items.customForEach((value) => {
//   console.log(value);
// });

// ------------------------------------------------------------------------------------

/** polyfill for map */
Array.prototype.customMap = function (callback, context) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  let mappedArray = [];
  for (let i = 0; i < this.length; i++) {
    mappedArray.push(callback.call(context, this[i], i, this));
  }
  return mappedArray;
};

// const res = items.customMap((value) => {
//   return value + 1;
// });
// console.log(res);

// ------------------------------------------------------------------------------------

/** polyfill for filter
 * @param context is optional
 */
Array.prototype.customFilter = function (callback, context) {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    if (callback.call(context, this[i], i, this)) {
      arr.push(this[i]);
    }
  }
  return arr;
};

// const a = items.customFilter((value) => value < 4);
// console.log(a);

// ------------------------------------------------------------------------------------

/** polyfill for reduce
 * @param context is optional
 */
// Polyfill for Array.prototype.reduce
Array.prototype.myReduce = function (callback, initialValue) {
  // Check if callback is a function
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const array = this; // 'this' refers to the array
  let accumulator;
  let startIndex;

  // Case 1: initialValue is provided
  if (arguments.length > 1) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // Case 2: no initialValue provided
    if (array.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = array[0];
    startIndex = 1;
  }

  // Loop through the array
  for (let i = startIndex; i < array.length; i++) {
    if (i in array) {
      accumulator = callback(accumulator, array[i], i, array);
    }
  }

  return accumulator;
};

// const a = items.customReduce((total, value) => total + value);
// console.log(a);

// ------------------------------------------------------------------------------------

/** polyfill for find
 * @param context is optional
 */
Array.prototype.customFind = function (callback, context) {
  for (let i = 0; i < this.length; i++) {
    if (callback.call(context, this[i], i, this)) {
      return this[i];
    }
  }
};

// const a = items.customFind((val) => val === 3);
// console.log(a);

// ------------------------------------------------------------------------------------

/** polyfill for indexOf()
 * @param context is optional
 */
Array.prototype.customIndexOf = function (value, context) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === value) return i;
  }
  return -1;
};

// const a = items.customIndexOf(3);
// console.log(items.indexOf(3));
// console.log(a);

// ------------------------------------------------------------------------------------

/** polyfill for some()
 * @param context is optional
 */
Array.prototype.customSome = function (callback, context) {
  for (let i = 0; i < this.length; i++) {
    if (callback.call(context, this[i], i, this)) return true;
  }
  return false;
};

// const a = items.customSome((val) => val > 5);
// console.log(a);

// ------------------------------------------------------------------------------------

/** polyfill for every()
 * @param context is optional
 */
Array.prototype.customEvery = function (callback, context) {
  for (let i = 0; i < this.length; i++) {
    if (!callback.call(context, this[i], i, this)) return false;
  }
  return true;
};

// const a = items.customEvery((val) => val > 0);
// console.log(a);
