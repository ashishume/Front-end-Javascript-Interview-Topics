"use strict";

let user = {
  name: "Ashish",
  age: 21,
  getDetails() {
    const a = () => console.log(this.name);
    a();
  },
};

console.log(user.getDetails());
