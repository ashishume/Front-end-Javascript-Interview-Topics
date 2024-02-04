/**
 * - The Module Pattern is a design pattern used in JavaScript to encapsulate 
 *   and organize code by creating private and public scopes within a single module or object. 
 *
 *  - It allows you to create private variables and methods, providing a way to control access 
 *   and avoid polluting the global namespace. 
 * 
 *  - The Module Pattern is a form of the Immediately 
 *  
 *  - Invoked Function Expression (IIFE) combined with closures.
 */
const MyModule = (function () {
    // Private variables and methods
    let privateVariable = "I am private";
  
    function privateMethod() {
      console.log("This is a private method");
    }
  
    // Public interface
    return {
      publicVariable: "I am public",
  
      publicMethod: function () {
        console.log("This is a public method");
        // Accessing private variables and methods
        console.log(privateVariable);
        privateMethod();
      },
    };
  })();
  
  // Example Usage
  console.log(MyModule.publicVariable); // Output: I am public
  MyModule.publicMethod(); // Output: This is a public method, I am private, This is a private method
  