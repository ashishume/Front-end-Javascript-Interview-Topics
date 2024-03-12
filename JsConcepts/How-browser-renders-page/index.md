 Refer this link for more details: 
- https://learnersbucket.com/examples/web/how-a-web-page-is-rendered-in-browser/ 
- https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path

- Below process is called CRP (critical rendering process)
The rendering process of a web page in a browser involves several steps:

# HTML Parsing:  (DOM content loading)
- The browser begins by fetching the HTML content of the web page from the server. Once the HTML is received, the browser parses it into a DOM (Document Object Model) tree. The DOM represents the structure of the web page, with each HTML element becoming a node in the tree.
DOM construction is incremental. (The HTML response turns into tokens which turns into nodes which turn into the DOM Tree. A single DOM node starts with a startTag token and ends with an endTag token. Nodes contain all relevant information about the HTML element)

# CSS Parsing and Styling: (parsing CSSOM)
- After parsing the HTML, the browser fetches and parses any linked CSS files or inline styles. The CSSOM contains all the information on how to style the DOM. CSSOM is similar to the DOM, but different. While the DOM construction is incremental, CSSOM is not. CSS is render blocking: the browser blocks page rendering until it receives and processes all the CSS. CSS is render blocking because rules can be overwritten, so the content can't be rendered until the CSSOM is complete.

# Rendering Tree Construction:  (Combining of CSSOM and DOM)
- Next, the browser combines the DOM tree and CSSOM to create a rendering tree, also known as the render tree. The rendering tree contains only the elements that will be displayed on the screen, along with their styles and layout information. Elements that are hidden or not rendered, such as those inside head or script tags, are excluded from the rendering tree.


# Layout (Reflow): (forms Layout and browser makes calculation of each element)
- With the rendering tree constructed, the browser calculates the layout or geometry of each element on the page. This process, also called reflow or layout, determines the size and position of each element relative to the viewport. Changes to the layout of one element may trigger reflows of other elements, impacting performance.

# Painting: (browser starts painting the on the screen)
- Once the layout is computed, the browser proceeds to paint the content of the rendering tree onto the screen. This involves drawing pixels for each visible element, applying styles, colors, borders, backgrounds, and other visual properties. The painting process is typically optimized for speed to ensure smooth rendering performance.

# Compositing: (browser finally presents visual of webpage)
- In the final stage, the browser combines the painted layers to create the complete visual representation of the web page. This process, known as compositing, involves stacking and blending the layers to produce the final image displayed to the user. Modern browsers often use hardware acceleration and GPU (Graphics Processing Unit) rendering to optimize compositing performance.

- Throughout this rendering process, browsers may employ various optimizations, such as caching, lazy loading, and incremental rendering, to improve the speed and efficiency of page rendering. Additionally, browser extensions, plugins, and user preferences can also influence the rendering behavior and appearance of web pages.