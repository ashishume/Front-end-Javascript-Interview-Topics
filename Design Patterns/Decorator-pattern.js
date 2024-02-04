/**
- The client starts with a concrete component that implements the core functionality. 
- Decorator classes are created to add new functionality to the base component
- Each decorator extends the base component's behavior.
- The client uses the decorated component as if it were the original component

Example below is the coffee example, where cost of base coffee is e.g. ₹5, but when for milk-coffee its ₹10
and for sugar coffee its ₹20, so same coffee with some additional features added
 */

class Coffee {
  cost() {
    return 5;
  }
}

// Decorator
class CoffeeDecorator {
  constructor(coffee) {
    this._coffee = coffee;
  }

  cost() {
    return this._coffee.cost();
  }
}

// Concrete Decorator 1
class MilkDecorator extends CoffeeDecorator {
  cost() {
    return this._coffee.cost() + 2;
  }
}

// Concrete Decorator 2
class SugarDecorator extends CoffeeDecorator {
  cost() {
    return this._coffee.cost() + 1;
  }
}

// Example Usage
const simpleCoffee = new Coffee();
console.log("Cost of simple coffee:", simpleCoffee.cost());

const milkCoffee = new MilkDecorator(simpleCoffee);
console.log("Cost of milk coffee:", milkCoffee.cost());

const sugarMilkCoffee = new SugarDecorator(milkCoffee);
console.log("Cost of sugar milk coffee:", sugarMilkCoffee.cost());
