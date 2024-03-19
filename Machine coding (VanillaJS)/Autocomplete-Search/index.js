const searchDiv = document.querySelector("#search-results");
const list = [
  "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "Mens Casual Premium Slim Fit T-Shirts ",
  "Mens Cotton Jacket",
  "Mens Casual Slim Fit",
  "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  "Solid Gold Petite Micropave ",
  "White Gold Plated Princess",
  "Pierced Owl Rose Gold Plated Stainless Steel Double",
  "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
  "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
];

function onChangeData(event) {
  const value = event.target.value;
  /** fetching the filtered data */
  const filteredArray = myFilter(value);
  if (filteredArray.length) {
    /** adding the display block class css */
    searchDiv.classList.add("show-search");
    /** create a light document which doesnt effect actual dom tree */
    const documentFragment = document.createDocumentFragment();
    filteredArray.forEach((value) => {
      /** appending each value child to dom tree */
      const div = document.createElement("div");
      div.classList.add("search-item");
      div.textContent = value;
      documentFragment.appendChild(div);
    });
    /** clearing any previous value if present and adding new sugestions to the list */
    searchDiv.innerHTML = "";
    /** put a event listener at the top, search div */
    searchDiv.addEventListener("click", handleItemClick);
    searchDiv.appendChild(documentFragment);
  } else {
    /** remove the show-search class when no data is there */
    searchDiv.classList.remove("show-search");
  }
}

/** get the value which is clicked */
const handleItemClick = (e) => {
  console.log(e.target.textContent);
  searchDiv.classList.remove("show-search");
};

/** filter the array */
const myFilter = (value) => {
  return value !== ""
    ? list.filter((option) => option.toLowerCase().includes(value))
    : [];
};

/** debounce for some delay */
const myDebounce = (functions, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      functions(...args);
    }, delay);
  };
};

const debounceMethod = myDebounce(onChangeData, 300);
