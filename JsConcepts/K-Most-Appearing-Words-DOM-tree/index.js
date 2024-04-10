// Question: Find the K most frequently appeared Text Nodes

document.KMostAppearingWordsInDomTree = function (limit) {
  const textContent = getAllTextContent(this.body);
  const words = textContent
    .toLowerCase()
    .split(/\s+/) // convert to array with with spaces
    .filter((v) => v !== ""); // filter out the space items from the array

  let wordsCount = {};
  words.forEach((word) => {
    wordsCount[word] = (wordsCount[word] || 0) + 1; //add the count for each words
  });

  let result = [];
  for (let [word, count] of Object.entries(wordsCount)) {
    if (count >= limit) {
      result.push(word); // push the word which is equal or greater than limit given
    }
  }
  return result; // return the result

  function getAllTextContent(currentNode) {
    let textContent = "";

    function traverse(currentNode) {
      if (currentNode.nodeType === Node.TEXT_NODE) {
        // if text node then concat the words
        textContent += currentNode.textContent.trim() + " ";
      } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
        // if element nodes like div, span, p then call recursively
        for (const child of currentNode.childNodes) {
          traverse(child);
        }
      }
    }

    traverse(currentNode);
    return textContent;  // return the words in a single sentence includes trailing spaces.
  }
};

console.log(document.KMostAppearingWordsInDomTree(3)); // limit 3
