// Convert HTML DOM tree nodes into JSON format
function serializeDOMTree(node) {
  /** create the json structure for the json data */
  let nodeData = {
    tag: node.tagName.toLowerCase(),
    attributes: {},
    children: [],
  };

  /** store all the attributes of the element (e.g. class, id, data-cy etc) */
  for (let i = 0; i < node.attributes.length; i++) {
    const attr = node.attributes[i];
    nodeData.attributes[attr.name] = attr.value;
  }

  /** loop through the child nodes */
  for (let i = 0; i < node.childNodes.length; i++) {
    const childNode = node.childNodes[i];

    /** if element node found then make recursive call for further children */
    if (childNode.nodeType === Node.ELEMENT_NODE) {
      nodeData.children.push(serializeDOMTree(childNode));
    } else if (childNode.nodeType === Node.TEXT_NODE) {
      /** if text node then store the value as child */
      const text = childNode.textContent.trim();
      if (text) {
        nodeData.children.push(text);
      }
    }
  }

  return nodeData;
}

console.log(serializeDOMTree(document.body));

/**
 HTML document:
 
 <div class="parent">
        This is sample tree
        <span id="randomId">Again find a word is difficult</span>
        <section class="content">
          my self ashish, find the sample tree here
          <span>sample word here</span>
        </section>
  </div> 
  */

/**
   * OUTPUT:
  {
    "tag": "body",
    "attributes": {},
    "children": [
        {
            "tag": "div",
            "attributes": {
                "class": "parent"
            },
            "children": [
                "This is sample dom element structure",
                {
                    "tag": "span",
                    "attributes": {
                        "id": "randomId"
                    },
                    "children": [
                        "Nested span tag with random attribute"
                    ]
                },
                {
                    "tag": "section",
                    "attributes": {
                        "class": "content"
                    },
                    "children": [
                        "my self ashish, this again a nested section tag element",
                        {
                            "tag": "span",
                            "attributes": {
                                "id": "nested"
                            },
                            "children": [
                                "Span tag is inserted here"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "tag": "script",
            "attributes": {
                "src": "./index.js"
            },
            "children": []
        }
    ]
} 

   */
