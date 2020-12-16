// console.log(age);
// console.log(showAge);
// This zone is TEMPORAL DEAD ZONE (var is accessible (but shows undefined) before assigning and let shows reference error)

// let age = 1;
// var showAge = 2;
// const constAge;

// constAge=5;
// console.log(constAge);

// following code is written inside a blocked scope
// {
//   var a = 1;
//   const b = 2;
//   let c = 3;

//   console.log(a); //prints
//   console.log(b); //prints
//   console.log(c); //prints
// }

// if we redeclare "a" then "a" var will get shadowed (meaning override)

// console.log(a); //prints
// console.log(b); //does not print
// console.log(c); //does not print

const a = 20;
{
  const a = 100;
  {
    const a = 200;
    {
      const a = 400;
      console.log(a);
    }
  }
}
