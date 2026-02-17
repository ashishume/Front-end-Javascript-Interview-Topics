# K Most Appearing Words in DOM Tree

## Overview
Finding the K most frequently appearing words in a DOM tree involves traversing the DOM, extracting all text content, counting word frequencies, and returning the top K words. This is useful for content analysis, SEO optimization, and text analytics.

## Basic Implementation

```javascript
// Question: Find the K most frequently appeared Text Nodes

document.KMostAppearingWordsInDomTree = function (limit) {
  const textContent = getAllTextContent(this.body);
  const words = textContent
    .toLowerCase()
    .split(/\s+/) // Convert to array with spaces
    .filter((v) => v !== ""); // Filter out the space items from the array

  let wordsCount = {};
  words.forEach((word) => {
    wordsCount[word] = (wordsCount[word] || 0) + 1; // Add the count for each word
  });

  let result = [];
  for (let [word, count] of Object.entries(wordsCount)) {
    if (count >= limit) {
      result.push(word); // Push the word which is equal or greater than limit given
    }
  }
  return result; // Return the result

  function getAllTextContent(currentNode) {
    let textContent = "";

    function traverse(currentNode) {
      if (currentNode.nodeType === Node.TEXT_NODE) {
        // If text node then concat the words
        textContent += currentNode.textContent.trim() + " ";
      } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
        // If element nodes like div, span, p then call recursively
        for (const child of currentNode.childNodes) {
          traverse(child);
        }
      }
    }

    traverse(currentNode);
    return textContent;  // Return the words in a single sentence includes trailing spaces.
  }
};

console.log(document.KMostAppearingWordsInDomTree(3)); // limit 3
```

## Enhanced Implementation

### Return Top K Words
```javascript
function getKMostFrequentWords(rootElement, k) {
  const textContent = extractTextContent(rootElement);
  const words = textContent
    .toLowerCase()
    .split(/\W+/) // Split by non-word characters
    .filter(word => word.length > 0);
  
  // Count word frequencies
  const wordCount = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  // Sort by frequency and get top K
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([word, count]) => ({ word, count }));
}

function extractTextContent(node) {
  let text = '';
  
  function traverse(n) {
    if (n.nodeType === Node.TEXT_NODE) {
      text += n.textContent + ' ';
    } else if (n.nodeType === Node.ELEMENT_NODE) {
      // Skip script and style tags
      if (n.tagName !== 'SCRIPT' && n.tagName !== 'STYLE') {
        for (const child of n.childNodes) {
          traverse(child);
        }
      }
    }
  }
  
  traverse(node);
  return text;
}
```

## Use Cases

### 1. Content Analysis
```javascript
const topWords = getKMostFrequentWords(document.body, 10);
console.log('Most common words:', topWords);
```

### 2. SEO Analysis
```javascript
const keywords = getKMostFrequentWords(document.body, 5);
// Analyze for SEO
```

## Best Practices

1. **Filter Stop Words**: Remove common words (the, a, an, etc.)
2. **Normalize Text**: Handle case, punctuation
3. **Skip Scripts**: Exclude script and style tags
4. **Performance**: Optimize for large DOM trees
5. **Memory**: Consider memory usage for large texts
