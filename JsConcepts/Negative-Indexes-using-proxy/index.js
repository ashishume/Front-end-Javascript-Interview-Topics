function createNegativeIndexArray(array) {
    return new Proxy(array, {
      get: function(target, prop, receiver) {
        // Convert negative indices to positive indices
        const index = parseInt(prop);
        const positiveIndex = index < 0 ? target.length + index : index;
        
        // Return the value at the positive index
        return Reflect.get(target, positiveIndex, receiver);
      },
      set: function(target, prop, value, receiver) {
        // Convert negative indices to positive indices
        const index = parseInt(prop);
        const positiveIndex = index < 0 ? target.length + index : index;
        
        // Set the value at the positive index
        return Reflect.set(target, positiveIndex, value, receiver);
      }
    });
  }
  
  // Example usage:
  const arr = createNegativeIndexArray([1, 2, 3, 4, 5]);
  
  console.log(arr[-1]); // Output: 5 (last element)
  console.log(arr[-2]); // Output: 4 (second to last element)
  
  arr[-1] = 10; // Set last element to 10
  console.log(arr); // Output: [1, 2, 3, 4, 10]
  