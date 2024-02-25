/**
 * PROXY
NOTE: In JavaScript, a proxy is an object that wraps another object (known as the target) and 
intercepts operations like property lookup, assignment, function invocation, etc. 
This interception allows you to customize or control the behavior of these operations.


REFLECT
In JavaScript, Reflect is an object that provides methods for interceptable JavaScript operations. 
It's essentially a collection of utility functions for working with objects and performing meta-programming tasks. 
These methods are typically used with proxies to customize or control the behavior of objects.

*/

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
  