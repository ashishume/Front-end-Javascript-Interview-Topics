// write a function which take

// const str = "this is a sentence";
const str = "Hi!! I'm A sIMpLe sENtenCE";

//output: "tHis iS a sEntence"

function makeCapital(str) {
  const words = str.split(" ");
  const capitaliseWords = words.map((word) => {
    if (word.length < 2) return word.toLowerCase();
    const firstChar = word[0].toLowerCase();
    const secondChar = word[1].toUpperCase();
    const rest = word.slice(2).toLowerCase();
    return firstChar + secondChar + rest;
  });
  return capitaliseWords.join(" ");
}

console.log(makeCapital(str));
