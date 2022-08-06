const module = (function () {
  function privateMethod() {
    return "private method";
  }
  return {
    publicMethod: function () {
      console.log(privateMethod()); //private method can be accessed here
      console.log("public");
    },
  };
})();
// module.publicMethod(); //prints: public
// module.privateMethod() //Uncaught TypeError: module.privateMethod is not a function  (private method cannot be accessed here directly)

function ModulePattern() {
  const name = "Ashish";
  const age = 24;

  function addSomeAgeValue() {
    return 2;
  }
  function calculateAge() {
    return age + addSomeAgeValue();
  }
  return {
    returnName: function () {
      return name;
    },
    calculateAge,
  };
}

const moduleMethod = new ModulePattern();
// console.log(moduleMethod.returnName()); // prints "Ashish"
// console.log(moduleMethod.calculateAge()); //prints "26"
// console.log(moduleMethod.addSomeAgeValue()); //gives error since its a private method  (Uncaught TypeError: moduleMethod.addSomeAgeValue is not a function)
