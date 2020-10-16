//Making recursion function call to implement the pagination for geting the desired result

document.querySelector("#root").addEventListener("click", (e) => {
  getCountryCodeName("SM");
});
let getNameData;
let currentPageNumber = 1;
const getCountryCodeName = (code) => {
  fetch(
    `https://jsonmock.hackerrank.com/api/countries?page=${currentPageNumber}`
  )
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".loader").style.display = "block";
      if (data.data.length) {
        data.data.map((value) => {
          if (value.alpha2Code == code) {
            getNameData = value.name;
            document.querySelector(".loader").style.display = "none";
            console.log("insideFunc==>", getNameData);
            return getNameData;
          }
        });
      }
      if (!getNameData) {
        currentPageNumber++;
        getCountryCodeName("SM");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};


//https://javascript.info/currying-partials    for more info