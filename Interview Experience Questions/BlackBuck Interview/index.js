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
  let output = cars.reduce((acc, car) => {
    if (!acc[car.make]) {
      acc[car.make] = [];
    }
    acc[car.make].push({ model: car.model, year: car.year });
    return acc;
  }, {});
  return output;
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
