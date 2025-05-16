# How Browser Renders a Page

## Critical Rendering Path (CRP)

The browser follows a specific sequence of steps to render a webpage, known as the Critical Rendering Path. This process transforms HTML, CSS, and JavaScript into pixels on the screen.

## Step 1: HTML Parsing & DOM Construction

- Browser fetches and parses HTML into a Document Object Model (DOM) tree
- DOM construction is incremental:
  1. HTML → Tokens
  2. Tokens → Nodes
  3. Nodes → DOM Tree
- Each DOM node represents an HTML element with its properties

## Step 2: CSS Parsing & CSSOM Creation

- Browser fetches and parses CSS files and inline styles
- Creates CSS Object Model (CSSOM)
- Key differences from DOM:
  - CSSOM is not incremental
  - CSS is render-blocking
  - All CSS must be processed before rendering
  - Rules can be overwritten, requiring complete CSSOM

## Step 3: Render Tree Construction

- Combines DOM and CSSOM into a render tree
- Only includes visible elements
- Excludes hidden elements (display: none, head, script tags)
- Contains styling and layout information

## Step 4: Layout (Reflow)

- Calculates exact size and position of each element
- Determines viewport-relative positioning
- Performance impact: Changes can trigger cascading reflows

## Step 5: Paint

- Converts render tree into pixels
- Applies visual properties:
  - Colors
  - Borders
  - Backgrounds
  - Other visual styles
- Optimized for rendering speed

## Step 6: Compositing

- Combines painted layers into final display
- Uses hardware acceleration and GPU rendering
- Handles layer stacking and blending

## Performance Optimizations

- Caching
- Lazy loading
- Incremental rendering
- Hardware acceleration

## Additional Factors

- Browser extensions
- Plugins
- User preferences
- Device capabilities

For more detailed information, refer to:

- [How a Web Page is Rendered in Browser](https://learnersbucket.com/examples/web/how-a-web-page-is-rendered-in-browser/)
- [Critical Rendering Path](https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path)
