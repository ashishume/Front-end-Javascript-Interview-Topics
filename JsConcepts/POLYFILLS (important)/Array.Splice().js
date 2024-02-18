Array.prototype.mySplice = function (start, deleteCount, ...items) {
  const len = this.length;
  const startIndex =
    start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  const itemCount =
    arguments.length > 1
      ? Math.min(deleteCount, len - startIndex)
      : len - startIndex;
  const removed = new Array(itemCount);

  for (let i = 0; i < itemCount; i++) {
    removed[i] = this[startIndex + i];
  }

  const insertCount = items.length;
  const newLength = len - itemCount + insertCount;

  if (insertCount < itemCount) {
    for (let i = startIndex; i < len - itemCount; i++) {
      this[i + insertCount] = this[i + itemCount];
    }
    this.length = newLength;
  } else if (insertCount > itemCount) {
    for (let i = len - itemCount; i >= startIndex; i--) {
      this[i + insertCount - itemCount] = this[i + itemCount];
    }
  }

  for (let i = 0; i < insertCount; i++) {
    this[startIndex + i] = items[i];
  }

  this.length = newLength;

  return removed;
};

const months = ["Jan", "March", "April", "June"];
months.mySplice(1, 1, "Feb");

console.log(months);
