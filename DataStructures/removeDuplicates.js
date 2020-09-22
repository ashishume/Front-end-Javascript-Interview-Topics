const array = [1, 4, 5, 5, 6, 7, 7, 8, 3];

const data = array.filter((item, i) => {
  return array.indexOf(item) == i;
});

console.log(data);
