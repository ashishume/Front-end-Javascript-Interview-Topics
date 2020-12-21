const data = new Promise((resolve, reject) => {
  fetch("http://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((value) => {
      resolve(value);
    })
    .catch((e) => {
      reject("Failed");
    });
});

data
  .then((v) => {
    // console.log("1", v);
    throw new Error("Hello");
  })
  .catch((e) => {
    console.log("2", e);
  });
