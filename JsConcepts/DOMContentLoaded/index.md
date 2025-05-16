# DOMContentLoaded Event

The statements are mostly correct, but let me clarify a few points:

- The DOMContentLoaded event fires when:

  1. The initial HTML document has been completely parsed
  2. All deferred scripts (`<script defer src="...">`) and module scripts (`<script type="module">`) have downloaded and executed
  3. It does NOT wait for:
     - Images
     - Subframes
     - Async scripts
     - Stylesheets

- Important notes about stylesheets:

  - DOMContentLoaded itself doesn't wait for stylesheets
  - However, deferred scripts DO wait for stylesheets to load
  - Regular scripts (non-deferred, non-async) wait for already-parsed stylesheets

- The load event vs DOMContentLoaded:

  - Use load event only when you need to detect a fully-loaded page (including all resources)
  - Use DOMContentLoaded when you just need the DOM to be ready
  - It's a common mistake to use load when DOMContentLoaded would be more appropriate

- The sequence of events is:
  1. HTML parsing + deferred scripts execution
  2. DOMContentLoaded fires (before stylesheets and images load)
  3. load event fires (after everything is loaded)
