# Core Web Vitals

## Overview
Core Web Vitals are a set of metrics that measure real-world user experience on web pages. They focus on three key aspects: loading performance, interactivity, and visual stability. These metrics are crucial for SEO rankings and user experience.

## Key Metrics

### 1. Largest Contentful Paint (LCP)
The render time of the largest image or text block visible within the viewport, relative to when the page first started loading.

**Good**: < 2.5 seconds  
**Needs Improvement**: 2.5 - 4 seconds  
**Poor**: > 4 seconds

### 2. First Input Delay (FID)
Measures load responsiveness because it quantifies the experience users feel when trying to interact with unresponsive pages. A low FID helps ensure that the page is usable.

**Good**: < 100 milliseconds  
**Needs Improvement**: 100 - 300 milliseconds  
**Poor**: > 300 milliseconds

### 3. Cumulative Layout Shift (CLS)
Measures visual stability because it helps quantify how often users experience unexpected layout shifts. A low CLS helps ensure that the page is delightful.

**Good**: < 0.1  
**Needs Improvement**: 0.1 - 0.25  
**Poor**: > 0.25

## Other Important Metrics

### Page Size
The total file size of all the code, assets, and everything else needed on the page.

### Load Time
Closely related to page size, this is the amount of time required to load all the aforementioned assets.

### Time to First Byte (TTFB)
Time taken until the server responds with some data. This also enhances SEO rankings.

**Good**: < 200ms  
**Needs Improvement**: 200ms - 500ms  
**Poor**: > 500ms

### DOMContentLoaded (DCL)
Time taken for the full HTML code to load. This does not include CSS, JavaScript, or other assets.

### Time to Interactive (TTI)
Time taken until the user can interact with any interactive element, e.g., buttons, inputs, etc.

### First Contentful Paint (FCP)
Time until assets start being displayed on the webpage, whether it be text, images, or even backgrounds.

**Good**: < 1.8 seconds  
**Needs Improvement**: 1.8 - 3 seconds  
**Poor**: > 3 seconds

### Time to Above-the-Fold Load
Time until the topmost content on the page finishes loading, showing the user completed content without scrolling down.

## Measuring Core Web Vitals

### Using Web Vitals Library
```javascript
import { getLCP, getFID, getCLS } from 'web-vitals';

getLCP(console.log);
getFID(console.log);
getCLS(console.log);
```

### Using Performance Observer
```javascript
// Measure LCP
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
}).observe({ entryTypes: ['largest-contentful-paint'] });

// Measure FID
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('FID:', entry.processingStart - entry.startTime);
  }
}).observe({ entryTypes: ['first-input'] });

// Measure CLS
let clsValue = 0;
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  }
  console.log('CLS:', clsValue);
}).observe({ entryTypes: ['layout-shift'] });
```

## Optimization Strategies

### Improve LCP
- Optimize images (WebP, lazy loading)
- Preload critical resources
- Minimize render-blocking resources
- Optimize server response time
- Use CDN for static assets

### Improve FID
- Reduce JavaScript execution time
- Break up long tasks
- Minimize main thread work
- Optimize third-party scripts
- Use web workers for heavy computation

### Improve CLS
- Set size attributes on images/videos
- Reserve space for ads/embeds
- Avoid inserting content above existing content
- Prefer transform animations
- Use font-display: swap

## Best Practices

1. **Monitor Regularly**: Track metrics continuously
2. **Test on Real Devices**: Use real-world conditions
3. **Optimize Incrementally**: Focus on one metric at a time
4. **Use Tools**: Lighthouse, PageSpeed Insights, WebPageTest
5. **Set Performance Budgets**: Define acceptable thresholds
6. **Mobile First**: Optimize for mobile devices
