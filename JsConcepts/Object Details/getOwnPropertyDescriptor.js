const obj = {
  a: "sample value",
  b: 1,
  c: 4,
};

// define one property
Object.defineProperty(obj, "a", {
  enumerable: false,
});

// define multiple property
Object.defineProperties(obj, {
  b: {
    enumerable: false, //doesnt let print anywhere or loop through
  },
  c: {
    enumerable: true,
    configurable: false, //since its false, when we try to delete the property a line 23, it fails
  },
});

// console.log(delete obj.c);  //delete property, but fails
// console.log(obj);  //prints {c:4}

/**
  for (let key in obj) {
  console.log("==>", obj[key]); //prints only 4, i.e. "c"
}
 
*/

/** takes 1st arg as object and 2nd arg as the key property */

/**
 * 
 console.log(Object.getOwnPropertyDescriptor(obj, "a"));
 output:
 {
     value: 'sample value',
     writable: true,  //readonly or not
     enumerable: true, //iterable or not (for in loop)
     configurable: true  // the property cannot be removed nor any attribute can be changed, except its value.
    }
    
    */

// console.log(Object.getOwnPropertyDescriptors(obj));
/** output:
  {
  a: {
    value: 'sample value',
    writable: true,
    enumerable: false,
    configurable: true
  },
  b: { value: 1, writable: true, enumerable: false, configurable: true },
  c: { value: 4, writable: true, enumerable: true, configurable: false }
}

 * 
 */
