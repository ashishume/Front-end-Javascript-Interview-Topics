const str = "Ultimate Javascript / FrontEnd Guide";
const words = ["End", "Javascript"];
const div = document.getElementById("root");
function splitWordsBySpaceOrCapitalLetter(str, words) {
  let newWords = [];
  let word = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === " " || char.toUpperCase() === char) {
      if (word !== "") {
        newWords.push(word);
        word = "";
      }
    }
    word += char;
  }
  //for the last word
  if (word !== "") {
    newWords.push(word);
  }
  return newWords;
}

const newStringArr = splitWordsBySpaceOrCapitalLetter(str, words);

function highlightArray(newStringArr, words) {
  const strValue = newStringArr.map((value) => {
    if (words.includes(value)) {
      return `<strong>${value}</strong>`;
    }
    return value;
  });

  return strValue.join("");
}

console.log();
div.innerHTML = highlightArray(newStringArr, words);
