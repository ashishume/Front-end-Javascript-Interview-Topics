class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  area(l, b) {
    return l * b;
  }
}

const obj = new Rectangle(10, 20);

console.log(obj.area(5, 5));

