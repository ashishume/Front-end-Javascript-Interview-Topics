/**

The Factory Pattern is a creational design pattern that provides an interface 
for creating objects in a super class, but allows subclasses to alter the type 
of objects that will be created.

Example below is a shape, which is a general object, but using that, any shape like circle,square or rectangle
can be created which means, modifying the base object and creating new features.


NOTE: in case of decorator pattern, taking the coffee example: we r adding sugar or milk to the coffee itself
not changing the behavior of coffee
*/
class Shape {
  draw() {
    // Abstract method for drawing the shape
  }
}

// Concrete implementations of Shape
class Circle extends Shape {
  draw() {
    console.log("Drawing a circle");
  }
}

class Square extends Shape {
  draw() {
    console.log("Drawing a square");
  }
}

// Shape factory
class ShapeFactory {
  createShape(type) {
    switch (type) {
      case "circle":
        return new Circle();
      case "square":
        return new Square();
      default:
        throw new Error("Invalid shape type");
    }
  }
}

// Example Usage
const shapeFactory = new ShapeFactory();

const circle = shapeFactory.createShape("circle");
circle.draw(); // Output: Drawing a circle

const square = shapeFactory.createShape("square");
square.draw(); // Output: Drawing a square
