/*
    Map=> The Map object holds key-value pairs and remembers the original insertion 
          order of the keys. Any value (both objects and primitive values) may be used as 
          either a key or a value.

      Map()  vs Set() vs WeakMap()
      
      Map() stores key value pair with order maintained
      Set() stores key value pair with order maintained and unique value(duplication is not allowed)
      WeakMap() stores key value pair with non-primitive (type) key like function,object,window 
                    etc, value can be anything 
*/

const a = new Map();

a.set("name", "Ashish"); //set values
a.set("lname", "Debnath");

a.get("name"); //get values

//iteration of Map()
for (let value of a.values()) {
  //   console.log(value);
}

//array map() cannot be used here
a.forEach((value) => {
  //   console.log(value);
});

const obj = {
  name: "Ashish",
  lname: "Dev",
  age: 23,
};

Object.keys(obj).forEach((v) => {
  //   console.log(obj[v]);
});

const newMp = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);

// console.log(newMp);

const newSet = new Set();

newSet.add("Ash");
newSet.add("Dev");

// console.log(newSet);

newSet.forEach((v) => {
  //   console.log(v);
});

const newWeak = new WeakMap();

const key1 = function abc() {};
const key2 = { name: "Ashish" };
const key3 = window;
// const key4 = "number";  //not allowed (primitive not allowed)

newWeak.set(key1, "Ashish");
newWeak.set(key2, "Dev");
newWeak.set(key3, "WindowObject");
// newWeak.set(key4, "Number"); //not allowed

console.log(newWeak);
