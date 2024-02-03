Array.prototype.insert = function (index, element) {
  this.splice(index, 0, element);
  return this;
};

// insert(index, element);
arr = [1, 2, 3, 4, 5];
newArr = arr.insert(2, 6);
console.log(newArr); // [1,2,6,3,4,5]
