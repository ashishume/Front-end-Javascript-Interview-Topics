# Critical Rendering Path (CRP)

## Overview
The Critical Rendering Path (CRP) is the sequence of steps the browser goes through to convert the HTML, CSS, and JavaScript into pixels on the screen. Understanding CRP is essential for optimizing page load performance and improving user experience.

## CRP Steps

1. **HTTP Request**: Request for a web page or app starts with an HTTP request
2. **HTML Parsing**: The server sends a response containing the HTML. The browser then begins parsing the HTML, converting the received bytes to the DOM tree
3. **Resource Requests**: The browser initiates requests every time it finds links to external resources, be it stylesheets, scripts, or embedded image references
4. **CSSOM Construction**: With the DOM and CSSOM complete, the browser builds the render tree
5. **Render Tree**: Computing the styles for all the visible content
6. **Layout**: After the render tree is complete, layout occurs, defining the location and size of all the render tree elements
7. **Paint**: Once complete, the page is rendered, or 'painted' on the screen

## Blocking Resources

### CSS (Render Blocking)
CSS is render blocking in nature, meaning it stops the CSS loading until all the CSS files finish loading.

```html
<!-- Render blocking - browser waits for CSS -->
<link rel="stylesheet" href="styles.css">
```

### JavaScript (Parser Blocking)
Script tag is parser blocking in nature - it blocks HTML parsing.

```html
<!-- Parser blocking - stops HTML parsing -->
<script src="app.js"></script>
```

## Optimization Techniques

### 1. Minimize Render-Blocking CSS
```html
<!-- Inline critical CSS -->
<style>
  /* Critical above-the-fold styles */
</style>

<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### 2. Defer Non-Critical JavaScript
```html
<!-- Defer non-critical scripts -->
<script defer src="analytics.js"></script>

<!-- Async for independent scripts -->
<script async src="widget.js"></script>
```

### 3. Optimize Resource Loading
```html
<!-- Preload important resources -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Prefetch for next page -->
<link rel="prefetch" href="next-page.html">
```

## Best Practices

1. **Minimize Critical Resources**: Reduce number and size
2. **Optimize CSS**: Remove unused CSS, minify
3. **Optimize JavaScript**: Code splitting, tree shaking
4. **Optimize Images**: Use appropriate formats, lazy loading
5. **Use CDN**: Serve static assets from CDN
6. **Enable Compression**: Gzip/Brotli compression
