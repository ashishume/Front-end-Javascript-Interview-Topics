## Async and Defer

<!--  refer link: https://javascript.info/script-async-defer  -->

# Defer: (waits untill html parsing is complete)

- Scripts with defer always execute when the DOM is ready (but before DOMContentLoaded event).

1.  The defer attribute tells the browser not to wait for the script.
    Instead, the browser will continue to process the HTML, build DOM.
    The script loads “in the background”, and then runs when the DOM is fully built.

2.  Defer also ensures that order of loading the scripts is maintained so that, if any
    dependent script is loaded on the previous scripts then, it works smoothly.

- here small downloads first, but waits for long to finish loading then, executes in order

- `<script> defer src="https://javascript.info/article/script-async-defer/long.js"> </script>`
- `<script> defer src="https://javascript.info/article/script-async-defer/small.js"> </script>`

3. The defer attribute is only for external scripts
   The defer attribute is ignored if the script tag has no src.

## Async:

# Async is similar to defer, (doesnt wait for html parsing, loads parallel)

- DOMContentLoaded and async scripts don’t wait for each other

- Major difference is that, they loads independently, doesnt wait for any other scripts/html code,
- Taking the long.js and small.js example above, probably small.js loads first so it runs first, then long.js runs.
  Doesnt care about dependency with each other.

- Async scripts are best for ads, page counters or data collectors etc. as they dnt on page script to load.
