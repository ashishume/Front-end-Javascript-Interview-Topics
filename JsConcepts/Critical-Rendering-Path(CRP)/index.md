# CRP (Its the sequence of steps the browser goes through to convert the HTML, CSS, and JavaScript into pixels on the screen.)

- A request for a web page or app starts with an HTTP request. The server sends a response containing the HTML. The browser then begins parsing the HTML, converting the received bytes to the DOM tree. The browser initiates requests every time it finds links to external resources, be it stylesheets, scripts, or embedded image references. Some requests are blocking, which means the parsing of the rest of the HTML is halted until the imported asset is handled. The browser continues to parse the HTML making requests and building the DOM, until it gets to the end, at which point it constructs the CSS object model. With the DOM and CSSOM complete, the browser builds the render tree, computing the styles for all the visible content. After the render tree is complete, layout occurs, defining the location and size of all the render tree elements. Once complete, the page is rendered, or 'painted' on the screen.

## CSS

- CSS is render blocking in nature, meaning it stops the css loading until all the css files finishes loading

## Script

- Script tag is parser blocking in nature

## For more refer (JsConcepts\How-browser-renders-page\index.md)
