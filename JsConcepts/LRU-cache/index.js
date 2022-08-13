/** LRU(Least recently used) cache
 * delete the item which is least recently used(get or set) and store the data,
 * upto the given max limit
 */

class LRU {
  constructor(max = 5) {
    this.maxSize = max;
    this.map = new Map();
  }
  /** when element is accessed we delete the old one and add new one
   * to keep that element into the recently used map value
   */
  get(key) {
    const item = this.map.get(key);
    if (item) {
      this.map.delete(key);
      this.map.set(key, item);
    }
  }
  /** when element is set, if the size is equal to max limit then we delete the first
   * element from the map as its least recently used, and add new one
   */
  set(key, value) {
    if (this.map.size === this.maxSize) {
      this.map.delete(this.first());
    }
    if (this.map.has(value)) {
      // if element is already present then we delete that one and add new one
      this.map.delete(key);
    }
    this.map.set(key, value);
  }
  first() {
    const [firstKey] = this.map.keys(); // gives us the first element to delete it
    return firstKey;
  }
}

const lru = new LRU(3);

lru.set("role", "SDE");
lru.set("name", "Ashish");
lru.get("role");
lru.set("age", "21");
lru.set("loc", "bangalore");
console.log(lru.map);
/** output:
[
    {"role" => "SDE"}
    {"age" => "21"}
    {"loc" => "bangalore"}
]
 */
