let sampleData = [];

(function fetchAllData() {
  fetch("./Data.json")
    .then((data) => data.json())
    .then((data) => {
      sampleData = data.config;
      console.log(sampleData);
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
  option.textContent = value;
  return option;
}

function createTable(data) {
  createTableHeader();
  const table = document.querySelector(".data-table");
  const tBody = document.createElement("tbody");
  tBody.setAttribute("class", "table-data-container");

  /** append the tbody to the table tag */
  table.appendChild(tBody);

  table.setAttribute("onchange", `changeValueHandler(event)`);

  data.forEach((item) => {
    const tableRow = document.createElement("tr");
    const checkbox = document.createElement("td");
    const label = document.createElement("td");
    const value = document.createElement("td");
    const description = document.createElement("td");

    let valueItem;
    //input or select field type
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

    /** checked or not checked */
    if (item?.selected) {
      checkField.setAttribute("checked", item?.selected);
    }
    /** disabled based on checked value */
    valueItem.disabled = !item.selected;
    valueItem.setAttribute("id", item.key);

    //appending all the values
    checkbox.appendChild(checkField);
    // NOTE: Append this parent not child using event delegation
    checkField.setAttribute(
      "onchange",
      `toggleSelectHandler("${item.key}",event)`
    );
    label.textContent = item.label;
    value.appendChild(valueItem);
    description.textContent = item.description;

    tableRow.appendChild(checkbox);
    tableRow.appendChild(label);
    tableRow.appendChild(value);
    tableRow.appendChild(description);
    tBody.appendChild(tableRow);

    markCheckedData(item);
  });
}

function createTableHeader() {
  let headers = ["-", "key", "value", "description"];
  const tableDiv = document.querySelector(".data-table");
  const thead = document.createElement("thead");
  const tableRow = document.createElement("tr");

  headers.forEach((value) => {
    const newTd = document.createElement("td");
    newTd.setAttribute("id", value);
    newTd.textContent = value;
    tableRow.appendChild(newTd);
  });

  thead.appendChild(tableRow);
  tableDiv.appendChild(thead);
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

function changeValueHandler(event) {
  if (event.target.type !== "checkbox") {
    const element = document.getElementById(event.target.id);
    element.value = event.target.value;
    /** update the changed value in original array */
    sampleData = sampleData.map((val) => {
      if (val.key === event.target.id) {
        val.field.defaultValue = event.target.value;
      }
      return val;
    });
  }
}

let result = [];
function markCheckedData(item) {
  if (item.selected) result.push(item);
}

function showResult() {
  console.log(result);
}
