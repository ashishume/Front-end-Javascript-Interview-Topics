/**
 * ResizeObserver is a web API that reports changes to the dimensions of an element's content or border box
 * This implementation demonstrates how to track size changes of multiple elements
 */

// Get references to the DOM elements we want to observe
const container = document.querySelector(".container");
const side = document.querySelector(".container-side");

// Create a ResizeObserver instance with a callback that handles size changes
const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const { target, contentRect, borderBoxSize } = entry;

    // Log detailed information about the size change
    console.log(`Element ${target.className} resized:`, {
      width: contentRect.width,
      height: contentRect.height,
      borderBoxSize: borderBoxSize[0],
    });
  });
});

// Start observing both elements for size changes
resizeObserver.observe(container);
resizeObserver.observe(side);
