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

const fetchPlaceholder = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("called");
    }, 1000);
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((data) => {
    //     resolve(data.json());
    //   })
    //   .catch((e) => {
    //     reject(new Error("Went wrong1111111"));
    //   });
  });

const fetchGitUsers = () =>
  new Promise((resolve, reject) => {
    fetch("https://api.github.com/users")
      .then((d) => {
        resolve(d.json());
      })
      .catch((e) => {
        reject(new Error("Went wrong22222"));
      });
  });

// Promise.all([fetchGitUsers, fetchPlaceholder]).then((d) => {
//   console.log(d);
// });

const fetchData = async () => {
  try {
    const data1 = await fetchGitUsers();
    const data2 = await fetchPlaceholder();
    console.log(data1);
    console.log(data2);
  } catch (e) {
    console.log("===>", e.message);
  }
};

fetchData();
// fetchData
//   .then((d) => {
//     console.log("==>", d);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
