Array.prototype.insert = function (index, element) {
  this.splice(index, 0, element);   
  /* when we add 0 so it means that delete 0 elements 
  but we have a 3rd params which adds the new element without deleting any 
  element which acts as an insert method */
  return this;
};

// insert(index, element);
arr = [1, 2, 3, 4, 5];
newArr = arr.insert(2, 6);
console.log(newArr); // [1,2,6,3,4,5]
