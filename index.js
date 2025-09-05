const a = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

let res = [];
for (let i = 0; i < a.length; i++) {
  let temp = [];

  for (let j = 0; j < a.length; j++) {
    temp.push(a[i][j]);
  }
  res.push(temp);
}

console.log(res);
