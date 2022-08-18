const data = {
  value: "", //value where actual value is stored
};

//"prop" property will be used for both getter and setter
Object.defineProperty(data, "prop", {
  get: function () {
    return this.value; //value property is returned
  },
  set: function (value) {
    this.value = value; //value property is stored
    printVal();
  },
});

const input = document.querySelector("#input-field");
input.addEventListener("keyup", (e) => {
    /** Note: "data.prop" is used to store the value */
    data.prop = e.target.value;
});

function printVal() {
    const el = document.querySelector("#show-value");
    /** Note: "data.prop" is used to receive the value */
  el.textContent = data.prop;
}
