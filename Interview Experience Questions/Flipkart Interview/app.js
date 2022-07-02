let sampleData = [];

(function fetchAllData() {
  fetch("./Data.json")
    .then((data) => data.json())
    .then((data) => {
      sampleData = data.config;
      createTable(sampleData);
    });
})();

function createInputField() {
  const input = document.createElement("input");
  input.setAttribute("style", "height: 30px; width: 100%;");
  return input;
}

function createSelectField() {
  const select = document.createElement("select");
  select.setAttribute("style", "width: 100%; height: 30px;");
  return select;
}

function createCheckField(key) {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  return checkbox;
}

function createOptions(key, value) {
  const option = document.createElement("option");
  //   option.setAttribute("id", key);
  option.innerHTML = value;
  return option;
}

function createTable(data) {
  const tableDataContainer = document.querySelector(".table-data-container");
  data.map((item) => {
    const tableRow = document.createElement("tr");
    const checkbox = document.createElement("td");
    const label = document.createElement("td");
    const value = document.createElement("td");
    const description = document.createElement("td");

    //input field type
    let valueItem;
    if (item.field.type === "text") {
      valueItem = createInputField();
      valueItem.defaultValue = item.field.defaultValue;
    } else if (item.field.type === "select") {
      valueItem = createSelectField();
      item.field.options.map((optionItem) => {
        let options = createOptions(item.key, optionItem);
        valueItem.appendChild(options);
      });
    }

    //checkbox
    let checkField;
    checkField = createCheckField(item.key);
    if (item.selected === true) {
      checkField.setAttribute("checked", "true");
      valueItem.disabled = false;
    } else {
      valueItem.disabled = true;
    }
    valueItem.setAttribute("id", item.key);
    valueItem.setAttribute("onchange", `changeValueHandler(event,"${item.key}")`);

    //appending all the values
    checkbox.appendChild(checkField);
    checkField.setAttribute("onchange", `toggleSelectHandler("${item.key}",event)`);
    label.innerHTML = item.label;
    value.appendChild(valueItem);
    description.innerHTML = item.description;

    tableRow.appendChild(checkbox);
    tableRow.appendChild(label);
    tableRow.appendChild(value);
    tableRow.appendChild(description);
    tableDataContainer.appendChild(tableRow);

    markCheckedData(item);
  });
}

function searchTableData(e) {
  let matchString = e.target.value;
  let filteredData = sampleData.filter((data) => {
    return data.label.toLowerCase().includes(matchString.toLowerCase());
  });
  console.log(filteredData); //printing the filtered data
  //   sampleData = filteredData;
}

function toggleSelectHandler(item, e) {
  sampleData.map((value) => {
    let inputEl = document.getElementById(value.key);
    if (value.key === item) {
      if (e.target.checked) {
        inputEl.disabled = false;
        result.push(value);
      } else {
        inputEl.disabled = true;
        result = result.filter((v) => v.key !== item);
      }
    }
  });
}

function changeValueHandler(e, key) {
  const el = document.getElementById(key);
  el.value = e.target.value;
}

let result = [];
function markCheckedData(item) {
  if (item.selected) result.push(item);
}

function showResult() {
  console.log(result);
}
