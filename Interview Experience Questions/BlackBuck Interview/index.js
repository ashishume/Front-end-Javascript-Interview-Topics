/** Q. use the cars array to convert the output into 2nd array (outpuat array) */

let cars = [
  {
    make: "audi",
    model: "r8",
    year: "2012",
  },
  {
    make: "audi",
    model: "rs5",
    year: "2013",
  },
  {
    make: "ford",
    model: "mustang",
    year: "2012",
  },
  {
    make: "ford",
    model: "fusion",
    year: "2015",
  },
  {
    make: "kia",
    model: "optima",
    year: "2012",
  },
];

function createOutput(cars) {
  let result = {};
  for (let index in cars) {
    if (!result[cars[index].make]) {
      result[cars[index].make] = [];
    }
    result[cars[index].make].push({
      model: cars[index].model,
      year: cars[index].year,
    });
  }
  return result;
}

const a = createOutput(cars);

console.log(a); //result gives the below output

let output = {
  audi: [
    { model: "r8", year: "2012" },
    { model: "rs5", year: "2013" },
  ],
  ford: [
    { model: "mustang", year: "2012" },
    { model: "fusion", year: "2015" },
  ],
  kia: [{ model: "optima", year: "2012" }],
};