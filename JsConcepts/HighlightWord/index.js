/** highlight word */

const str = "Ultimate Javascript / FrontEnd Guide";
const words = ["End", "Javascript"];
const div = document.getElementById("root");
function splitWordsBySpaceOrCapitalLetter(str, words) {
  const newStr = str.split(" ");
  return newStr
    .map((word) => {
      if (words.includes(word)) {
        return `<strong>${word}</strong>`;
      } else {
        for (let i = 0; i < word.length; i++) {
          prefix = word.slice(0, i + 1);
          suffix = word.slice(i + 1);

          if (words.includes(prefix) && words.includes(suffix)) {
            return `<strong>${prefix + suffix}</strong>`;
          } else if (words.includes(prefix) && !words.includes(suffix)) {
            return `<strong>${prefix}</strong>${suffix}`;
          } else if (!words.includes(prefix) && words.includes(suffix)) {
            return `${prefix}<strong>${suffix}</strong>`;
          }
        }
      }
      return word;
    })
    .join(" ");
}

const newStringArr = splitWordsBySpaceOrCapitalLetter(str, words);

div.innerHTML = newStringArr;
