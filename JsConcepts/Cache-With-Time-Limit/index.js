var TimeLimitedCache = function () {
  this.cache = new Map();
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  const exists = this.cache.has(key) && this.cache.get(key).expiry > Date.now();
  this.cache.set(key, {
    value,
    expiry: Date.now() + duration,
  });

  return exists;
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  if (!this.cache.has(key)) return -1;
  const { value, expiry } = this.cache.get(key);
  if (expiry > Date.now()) {
    return value;
  }
  this.cache.delete(key);
  return -1;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  let count = 0;
  for (let [key, { value, expiry }] of this.cache.entries()) {
    if (expiry > Date.now()) {
      count += 1;
    } else {
      this.cache.delete(key);
    }
  }

  return count;
};

const timeLimitedCache = new TimeLimitedCache();
timeLimitedCache.set(1, 42, 1000);
timeLimitedCache.set(2, 40, 1000);
timeLimitedCache.set(3, 30, 1000);
console.log(timeLimitedCache.get(1)); // 42
console.log(timeLimitedCache.get(2)); // 40
console.log(timeLimitedCache.get(3)); // 30
console.log(timeLimitedCache.count()); // 3
