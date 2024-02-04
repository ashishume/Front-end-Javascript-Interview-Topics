# Session Storage, Local Storage, and Cookies


# Session Storage:

- *Scope*: Limited to the duration of the page session. The data is available as long as the browser or tab is open.
- *Storage Limit*: Typically larger than cookies but still limited (around 5-10 MB).
- *Use Case*: Suitable for temporary data that is only needed during a specific session.
- *Access*: Can be accessed only by the same tab or window where it was set.

Example:  cart on an e-commerce site, so that cart data can be used later during that session, also multistep form data


# Local Storage:

- *Scope*: Persists even when the browser is closed and reopened. It's not tied to a session.
- *Storage Limit*: Larger storage capacity compared to cookies, typically around 5-10 MB.
- *Use Case*: Useful for long-term storage of data that needs to be available between sessions.
- *Access*: Can be accessed across multiple tabs or windows for the same domain.

Example: for caching any data used in PWA apps, storing for offline access

# Cookies:

- *Scope*: Can have an expiration date or exist only until the browser is closed (session cookies).
- *Storage Limit*: Smaller compared to session and local storage (typically around 4 KB).
- *Use Case*: Often used for storing small pieces of data that need to be sent to the server with each request. 
    Can also be used for tracking user preferences.
- *Access*: Can be accessed across different tabs or windows and can be sent to the server with each HTTP request.

Example: for token access, analytics etc
