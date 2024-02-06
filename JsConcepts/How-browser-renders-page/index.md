/** Refer this link for more details: https://learnersbucket.com/examples/web/how-a-web-page-is-rendered-in-browser/ */


# URL Parsing:
The browser breaks down the URL into components like protocol (HTTP/HTTPS), 
domain (e.g., www.example.com), and path (the specific resource).


# DNS Resolution:
The browser queries a DNS server to obtain the IP address associated with the 
domain name. This step is crucial for establishing a connection to the server.


# HTTP Request:
Using the IP address, the browser sends an HTTP request to the server. 
This request contains information like the method (GET, POST, etc.), headers, 
and may include additional data.


# Server Processing:
The server receives the request, processes it, and returns the requested resource. 
This could be an HTML file, which is the starting point for rendering the webpage.


# HTML Parsing:
The browser parses the HTML document, creating a DOM tree that represents the 
structure of the page. This tree consists of elements like headings, paragraphs, and other HTML tags.


# CSS Styling:
External CSS files are fetched and parsed. The styles defined in these files are applied 
to the corresponding elements in the DOM, creating a styled DOM.


# JavaScript Execution:
If there are JavaScript scripts in the HTML, the browser executes them. 
These scripts can manipulate the DOM, handle events, and make dynamic updates to the page.


# Rendering the Page:
The browser combines the styled DOM and executes layout computations to determine the position and size of each element. 
It then paints the pixels on the screen accordingly.


# Rendering Updates:
Any changes to the DOM triggered by user interactions or dynamic content (e.g., AJAX requests) 
lead to updates in the Render Tree. The browser re-renders affected portions of the page.


# Displaying the Page:
The final rendered page is displayed on the user's screen, 
combining HTML, CSS, and JavaScript to create the interactive and 
visually appealing web experience.
