const module = (function () {
  function privateMethod() {
    return "private method";
  }
  return {
    publicMethod: function () {
        console.log(privateMethod());  //private method can be accessed here
      console.log("public");
    },
  };
})();

// module.publicMethod(); //prints: public
// module.privateMethod() //Uncaught TypeError: module.privateMethod is not a function  (private method cannot be accessed here directly)
