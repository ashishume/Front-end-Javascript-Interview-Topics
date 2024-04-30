# https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

- The DOMContentLoaded event fires when the HTML document has been completely parsed, and all deferred scripts /script defer src="…"/ and /script type='module'/ have downloaded and executed. It doesn't wait for other things like images, subframes, and async scripts to finish loading.

- DOMContentLoaded does not wait for stylesheets to load, however deferred scripts do wait for stylesheets, and the DOMContentLoaded event is queued after deferred scripts. Also, scripts which aren't deferred or async e.g. script will wait for already-parsed stylesheets to load.

- A different event, load, should be used only to detect a fully-loaded page. It is a common mistake to use load where DOMContentLoaded would be more appropriate.

- Diagramatically shown
 # HTML parsing + defer script tag > DomContentLoaded (fires even before stylesheet, images is loaded) > onload (when whole page is loaded including images, stylesheets etc)