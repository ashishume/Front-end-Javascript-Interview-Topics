# Async and Defer Scripts in JavaScript

## Overview
The `async` and `defer` attributes control how external JavaScript files are loaded and executed in relation to HTML parsing. Understanding these attributes is crucial for optimizing page load performance and ensuring scripts execute at the right time.

## Defer Attribute

Scripts with `defer` always execute when the DOM is ready (but before DOMContentLoaded event).

### How Defer Works

1. The defer attribute tells the browser not to wait for the script.
   Instead, the browser will continue to process the HTML, build DOM.
   The script loads "in the background", and then runs when the DOM is fully built.

2. Defer also ensures that order of loading the scripts is maintained so that, if any
   dependent script is loaded on the previous scripts then, it works smoothly.

3. Here small downloads first, but waits for long to finish loading then, executes in order

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

### Key Points

- The defer attribute is only for external scripts
- The defer attribute is ignored if the script tag has no src
- Scripts execute in order, even if they load at different times
- Scripts execute after DOM is parsed but before DOMContentLoaded

## Async Attribute

Async is similar to defer, but doesn't wait for HTML parsing - loads in parallel.

### How Async Works

- DOMContentLoaded and async scripts don't wait for each other
- Major difference is that they load independently, doesn't wait for any other scripts/html code
- Taking the long.js and small.js example above, probably small.js loads first so it runs first, then long.js runs.
  Doesn't care about dependency with each other

```html
<script async src="script1.js"></script>
<script async src="script2.js"></script>
```

### Key Points

- Scripts load in parallel with HTML parsing
- Scripts execute as soon as they're downloaded
- Execution order is not guaranteed
- DOMContentLoaded may fire before or after async scripts

## Comparison

### No Attribute (Blocking)
```html
<script src="script.js"></script>
```
- Blocks HTML parsing
- Executes immediately when downloaded
- Blocks DOMContentLoaded

### Defer
```html
<script defer src="script.js"></script>
```
- Doesn't block HTML parsing
- Executes after DOM is ready
- Maintains execution order
- Executes before DOMContentLoaded

### Async
```html
<script async src="script.js"></script>
```
- Doesn't block HTML parsing
- Executes as soon as downloaded
- No guaranteed execution order
- May execute before or after DOMContentLoaded

## Visual Timeline

```
Blocking Script:
HTML parsing → [Script download] → [Script execution] → HTML parsing continues

Defer Script:
HTML parsing → [Script download in parallel] → HTML parsing completes → [Script execution]

Async Script:
HTML parsing → [Script download in parallel] → [Script execution when ready]
```

## Use Cases

### Use Defer When:
- Script depends on DOM being ready
- Scripts have dependencies on each other
- Script order matters
- Script doesn't need to run immediately

```html
<!-- Analytics, initialization scripts -->
<script defer src="analytics.js"></script>
<script defer src="app-init.js"></script>
```

### Use Async When:
- Script is independent
- Script order doesn't matter
- Script is for ads, counters, tracking
- Script doesn't need DOM

```html
<!-- Ads, analytics, social widgets -->
<script async src="ads.js"></script>
<script async src="analytics.js"></script>
```

### Use Neither When:
- Script must execute immediately
- Script is critical for initial render
- Script is inline and small

```html
<!-- Critical inline script -->
<script>
  // Critical initialization
</script>
```

## Best Practices

1. **Use Defer for Most Scripts**: Default choice for external scripts
2. **Use Async for Independent Scripts**: Ads, analytics, widgets
3. **Minimize Blocking Scripts**: Only when absolutely necessary
4. **Load Critical Scripts First**: Use defer for important scripts
5. **Consider Module Scripts**: Use type="module" for ES6 modules
6. **Preload Important Scripts**: Use `<link rel="preload">` for critical scripts

## Module Scripts

```html
<!-- ES6 modules are deferred by default -->
<script type="module" src="app.js"></script>

<!-- Equivalent to -->
<script type="module" src="app.js" defer></script>
```

## Dynamic Script Loading

```javascript
// Load script with defer
function loadScriptDefer(src) {
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  document.head.appendChild(script);
}

// Load script with async
function loadScriptAsync(src) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

// Load script and wait for it
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
```

## Performance Impact

### Blocking Scripts
- Slows down page rendering
- Blocks DOMContentLoaded
- Poor user experience

### Defer Scripts
- Doesn't block rendering
- Better perceived performance
- Scripts ready when DOM is ready

### Async Scripts
- Fastest initial load
- May cause layout shifts
- Good for non-critical scripts

## Real-World Example

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Critical CSS -->
  <link rel="stylesheet" href="critical.css">
  
  <!-- Preload important scripts -->
  <link rel="preload" href="app.js" as="script">
  
  <!-- Analytics (async - non-blocking) -->
  <script async src="analytics.js"></script>
</head>
<body>
  <!-- Content -->
  
  <!-- App script (defer - after DOM ready) -->
  <script defer src="app.js"></script>
  
  <!-- Third-party widgets (async) -->
  <script async src="widget.js"></script>
</body>
</html>
```
