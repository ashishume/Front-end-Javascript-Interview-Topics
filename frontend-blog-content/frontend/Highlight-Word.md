# Highlight Word in JavaScript

## Overview
Highlighting words in text involves finding specific words or phrases and wrapping them with HTML elements (like `<strong>` or `<mark>`) to visually emphasize them. This is useful for search functionality, text analysis, and content highlighting features.

## Basic Implementation

```javascript
/** Highlight word */

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
```

## Enhanced Implementation

### Case-Insensitive Highlighting
```javascript
function highlightWords(text, words, options = {}) {
  const {
    caseSensitive = false,
    className = 'highlight',
    tag = 'mark'
  } = options;
  
  let highlightedText = text;
  const normalizedWords = caseSensitive 
    ? words 
    : words.map(w => w.toLowerCase());
  
  normalizedWords.forEach((word, index) => {
    const regex = new RegExp(
      `(${escapeRegex(word)})`,
      caseSensitive ? 'g' : 'gi'
    );
    
    highlightedText = highlightedText.replace(
      regex,
      `<${tag} class="${className}">$1</${tag}>`
    );
  });
  
  return highlightedText;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

### Advanced Highlighting
```javascript
function highlightText(text, searchTerms, options = {}) {
  const {
    caseSensitive = false,
    wholeWords = false,
    className = 'highlight',
    multipleClasses = false
  } = options;
  
  if (!searchTerms || searchTerms.length === 0) {
    return text;
  }
  
  let result = text;
  const flags = caseSensitive ? 'g' : 'gi';
  
  searchTerms.forEach((term, index) => {
    const pattern = wholeWords 
      ? `\\b${escapeRegex(term)}\\b`
      : escapeRegex(term);
    
    const regex = new RegExp(pattern, flags);
    const classNames = multipleClasses 
      ? `${className} ${className}-${index}`
      : className;
    
    result = result.replace(
      regex,
      `<mark class="${classNames}">$&</mark>`
    );
  });
  
  return result;
}
```

## Use Cases

### 1. Search Results
```javascript
function highlightSearchResults(text, query) {
  return highlightWords(text, [query], {
    className: 'search-highlight'
  });
}
```

### 2. Multiple Keywords
```javascript
const keywords = ['javascript', 'react', 'vue'];
const highlighted = highlightWords(text, keywords);
```

### 3. Text Editor
```javascript
class TextHighlighter {
  highlight(element, words) {
    const text = element.textContent;
    const highlighted = highlightWords(text, words);
    element.innerHTML = highlighted;
  }
  
  clear(element) {
    element.innerHTML = element.textContent;
  }
}
```

## Best Practices

1. **Escape Special Characters**: Prevent regex injection
2. **Case Sensitivity**: Provide option for case-insensitive
3. **Performance**: Use efficient algorithms for large text
4. **Preserve Structure**: Don't break existing HTML
5. **Accessibility**: Use semantic HTML elements
