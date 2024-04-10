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

/** polyfill for reduce
 * @param context is optional
 */
Array.prototype.customReduce = function (callback, initialValue) {
  let accumulator = initialValue || undefined || Object(this)[0];
  for (let i = initialValue !== undefined ? 0 : 1; i < this.length; i++) {
    if (accumulator !== undefined) {
      accumulator = callback.call(undefined, accumulator, this[i], i, this);
    } else {
      accumulator = this[i];
    }
  }
  return accumulator;
};

// const a = items.customReduce((total, value) => total + value);
// console.log(a);

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
