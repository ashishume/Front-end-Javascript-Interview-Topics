const items = [1, 2, 3, 4, 5];

/** For each polyfill */
Array.prototype.customForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

// items.customForEach((value) => {
//   console.log(value);
// });

/** polyfill for map */
Array.prototype.customMap = function (callback) {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(callback([i], i, this));
  }
  return arr;
};

//  items.customMap((value) => {
//   return value + 1;
// });

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

/** polyfill for reduce
 * @param context is optional
 */
Array.prototype.customReduce = function (callback, initialValue, context) {
  let accumulator = initialValue || undefined;

  for (let i = 0; i < this.length; i++) {
    if (accumulator !== undefined) {
      accumulator = callback.call(context, accumulator, this[i], i, this);
    } else {
      accumulator = this[i];
    }
  }

  return accumulator;
};

/** polyfill for find
 * @param context is optional
 */
Array.prototype.customFind = function (callback, context) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
};

// const a = items.customFind((val) => val === 3);

// console.log(a);
