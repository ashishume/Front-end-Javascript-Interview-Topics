class Person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  getDetails() {
    return this.name + " " + this.age + " " + this.gender;
  }
}
class Employee extends Person {
  /**
   * We need to delete the derived class constructor to execute the base class constructor.
   * When we pass data using Employee object we get to see the details in Person class
     constructor() {
         super();
        }
*/

  getEmpDetails() {
    /** base class method */
    return super.getDetails();
  }
}

// const person = new Person("Ashish", 24, "Male");

/** we pass the name age and emp No. using employee class object but we print the data in base
 * class method via getEmpDetails(), inside it we have called the base method
 */
const emp = new Employee("Dev", 26, "ABC122");

// console.log(person.getDetails());
console.log(emp.getEmpDetails());
