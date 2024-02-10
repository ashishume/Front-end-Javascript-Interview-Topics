const array = [
  { name: "John", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 },
  { name: "Alice", age: 30 },
];

function sortArrayObjects(arr) {
  return arr.sort((a, b) => {
    //below method if, name and age both are considered for ascending or descending
    if (a.name !== b.name) {
      // If names are different, sort by name
      return a.name.toLowerCase().localeCompare(b.name);
    } else {
      // If names are the same, sort by age
      return a.age - b.age;
    }
  });
}

console.log(sortArrayObjects(array));
