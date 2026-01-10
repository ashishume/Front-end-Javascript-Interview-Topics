# Prefetch, Preload, and Preconnect in JavaScript

## Overview
Prefetch, Preload, and Preconnect are resource hints that allow browsers to optimize resource loading. They help improve page load performance by giving the browser hints about what resources will be needed and when.

## Prefetch

Prefetch hints the browser to fetch and cache resources that might be needed for subsequent navigation, improving the loading time of future pages.

### Syntax

```html
<link rel="prefetch" href="/uploads/images/pic.png">
```

### Use Cases

- **Next page resources**: Resources needed for the next page the user might visit
- **Lazy-loaded content**: Images or scripts that will be loaded later
- **Navigation assets**: CSS, JavaScript, or images for linked pages

### Example

```html
<!-- Prefetch resources for article pages -->
<link rel="prefetch" href="/article-template.css">
<link rel="prefetch" href="/article-script.js">
<link rel="prefetch" href="/images/article-hero.jpg">
```

**Real-world scenario**: A news article web page where the user lands on the home page which has multiple links for different articles. Prefetching images and styles ensures a smooth experience when navigating to article pages.

### JavaScript Implementation

```javascript
function prefetchResource(url) {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = url;
  document.head.appendChild(link);
}

// Prefetch on hover
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("mouseenter", () => {
    prefetchResource(link.href);
  });
});
```

## Preload

Preload hints the browser to fetch and cache a resource as soon as possible, even before it's needed. This is particularly useful for critical resources that are required for rendering the current page.

### Syntax

```html
<link rel="preload" href="/demo.js" as="script">
```

### Required `as` Attribute

The `as` attribute specifies the type of resource being preloaded:

- `script` - JavaScript files
- `style` - CSS files
- `image` - Images
- `font` - Font files
- `audio` - Audio files
- `video` - Video files
- `fetch` - Fetch/XHR requests
- `document` - HTML documents

### Examples

```html
<!-- Preload critical CSS -->
<link rel="preload" href="/critical.css" as="style">

<!-- Preload critical JavaScript -->
<link rel="preload" href="/main.js" as="script">

<!-- Preload fonts -->
<link rel="preload" href="/fonts/roboto.woff2" as="font" type="font/woff2" crossorigin>

<!-- Preload images -->
<link rel="preload" href="/hero-image.jpg" as="image">

<!-- Preload with media query -->
<link rel="preload" href="/mobile.css" as="style" media="(max-width: 768px)">
```

### JavaScript Implementation

```javascript
function preloadResource(url, as, options = {}) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = url;
  link.as = as;
  
  if (options.type) link.type = options.type;
  if (options.crossorigin) link.crossOrigin = options.crossorigin;
  if (options.media) link.media = options.media;
  
  document.head.appendChild(link);
}

// Preload critical resources
preloadResource("/critical.css", "style");
preloadResource("/main.js", "script");
preloadResource("/fonts/roboto.woff2", "font", {
  type: "font/woff2",
  crossorigin: "anonymous"
});
```

### When to Use Preload

- **Critical resources**: CSS and JS needed for above-the-fold content
- **Fonts**: Web fonts that are render-blocking
- **Hero images**: Large images that are immediately visible
- **Critical API data**: Data needed for initial render

## Preconnect

Preconnect hints the browser to establish early connections to third-party origins to reduce connection latency when resources from those origins are later requested.

### Syntax

```html
<link rel="preconnect" href="https://demo.com">
```

### Use Cases

- **Third-party APIs**: Establishing connections to API endpoints
- **CDN resources**: Static assets served from CDNs
- **External fonts**: Google Fonts, Adobe Fonts, etc.
- **Analytics**: Analytics and tracking scripts

### Example

```html
<!-- Preconnect to CDN -->
<link rel="preconnect" href="https://cdn.example.com">

<!-- Preconnect to API -->
<link rel="preconnect" href="https://api.example.com">

<!-- Preconnect to Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

**Real-world scenario**: A website integrates with a third-party API to fetch data or a CDN to serve static assets such as images or JavaScript libraries. Preconnecting to these domains can significantly reduce the time required to establish connections when the browser needs to fetch resources from them.

### JavaScript Implementation

```javascript
function preconnectToOrigin(origin, options = {}) {
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = origin;
  
  if (options.crossorigin) {
    link.crossOrigin = options.crossorigin;
  }
  
  document.head.appendChild(link);
}

// Preconnect to external services
preconnectToOrigin("https://api.example.com");
preconnectToOrigin("https://fonts.googleapis.com");
preconnectToOrigin("https://fonts.gstatic.com", { crossorigin: "anonymous" });
```

## Comparison Table

| Feature | Prefetch | Preload | Preconnect |
|---------|----------|---------|------------|
| **Purpose** | Future navigation | Current page | Connection setup |
| **Priority** | Low | High | High |
| **When** | Idle time | Immediately | Before request |
| **Use Case** | Next page | Critical resources | Third-party origins |
| **Caching** | Yes | Yes | No (connection only) |

## Best Practices

### 1. Combine with Other Optimizations

```html
<!-- Preconnect first -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Then preload -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto" as="style">

<!-- Finally, load normally -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto">
```

### 2. Use Preload for Critical Resources

```html
<!-- Critical CSS -->
<link rel="preload" href="/critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/critical.css"></noscript>

<!-- Critical JavaScript -->
<link rel="preload" href="/critical.js" as="script">
```

### 3. Preconnect Early

```html
<head>
  <!-- Preconnect to external domains early -->
  <link rel="preconnect" href="https://api.example.com">
  <link rel="preconnect" href="https://cdn.example.com">
  
  <!-- Other head content -->
</head>
```

### 4. Conditional Prefetching

```javascript
// Only prefetch on good connection
if (navigator.connection && navigator.connection.effectiveType === '4g') {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = "/next-page.html";
  document.head.appendChild(link);
}
```

### 5. Monitor Resource Hints

```javascript
// Check if resource was preloaded
const link = document.createElement("link");
link.rel = "preload";
link.href = "/resource.js";
link.as = "script";

link.onload = () => console.log("Resource preloaded successfully");
link.onerror = () => console.error("Failed to preload resource");

document.head.appendChild(link);
```

## Performance Impact

### Before Optimization

```
Page Load: 3.5s
- DNS Lookup: 200ms
- TCP Connection: 150ms
- TLS Handshake: 100ms
- Resource Download: 3.05s
```

### After Optimization (with Preconnect)

```
Page Load: 2.8s
- DNS Lookup: 0ms (preconnected)
- TCP Connection: 0ms (preconnected)
- TLS Handshake: 0ms (preconnected)
- Resource Download: 2.8s
```

## Browser Support

- **Prefetch**: Chrome 8+, Firefox 2+, Safari 5+, Edge 12+
- **Preload**: Chrome 50+, Firefox 56+, Safari 11.1+, Edge 79+
- **Preconnect**: Chrome 46+, Firefox 39+, Safari 11+, Edge 79+

## Common Mistakes

### 1. Over-prefetching

```html
<!-- ❌ Bad: Prefetching too many resources -->
<link rel="prefetch" href="/page1.html">
<link rel="prefetch" href="/page2.html">
<link rel="prefetch" href="/page3.html">
<!-- ... 20 more pages -->

<!-- ✅ Good: Prefetch only likely next pages -->
<link rel="prefetch" href="/most-visited-page.html">
```

### 2. Missing `as` Attribute

```html
<!-- ❌ Bad: Missing as attribute -->
<link rel="preload" href="/script.js">

<!-- ✅ Good: Include as attribute -->
<link rel="preload" href="/script.js" as="script">
```

### 3. Preconnecting Too Late

```html
<!-- ❌ Bad: Preconnect after resources are needed -->
<body>
  <link rel="preconnect" href="https://api.example.com">
</body>

<!-- ✅ Good: Preconnect in head -->
<head>
  <link rel="preconnect" href="https://api.example.com">
</head>
```

## Summary

Resource hints (Prefetch, Preload, and Preconnect) are powerful tools for optimizing page load performance. Use Prefetch for future navigation, Preload for critical current-page resources, and Preconnect to establish early connections to third-party origins. Proper use of these hints can significantly improve user experience and page load times.

