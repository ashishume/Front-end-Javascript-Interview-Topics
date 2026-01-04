# Session Storage, Local Storage, and Cookies

## Overview
JavaScript provides three mechanisms for storing data in the browser: **Session Storage**, **Local Storage**, and **Cookies**. Each has different characteristics, use cases, and limitations.

## Session Storage

Session Storage stores data for the duration of a page session. Data is cleared when the browser tab/window is closed.

### Characteristics
- **Scope**: Limited to the tab/window where it was created
- **Storage Limit**: ~5-10 MB
- **Lifetime**: Until tab/window is closed
- **Access**: Only accessible from the same tab

### Usage

```javascript
// Set item
sessionStorage.setItem("key", "value");
sessionStorage.setItem("user", JSON.stringify({ name: "John", id: 1 }));

// Get item
const value = sessionStorage.getItem("key");
const user = JSON.parse(sessionStorage.getItem("user"));

// Remove item
sessionStorage.removeItem("key");

// Clear all
sessionStorage.clear();

// Get key by index
const key = sessionStorage.key(0);

// Get number of items
const length = sessionStorage.length;
```

### Use Cases
- Shopping cart data during session
- Multi-step form data
- Temporary user preferences
- Session-specific state

## Local Storage

Local Storage persists data even after the browser is closed. Data remains until explicitly cleared.

### Characteristics
- **Scope**: Accessible across all tabs/windows of the same origin
- **Storage Limit**: ~5-10 MB
- **Lifetime**: Until explicitly cleared or browser data is cleared
- **Access**: Shared across all tabs/windows of same origin

### Usage

```javascript
// Set item
localStorage.setItem("theme", "dark");
localStorage.setItem("user", JSON.stringify({ name: "John", id: 1 }));

// Get item
const theme = localStorage.getItem("theme");
const user = JSON.parse(localStorage.getItem("user"));

// Remove item
localStorage.removeItem("theme");

// Clear all
localStorage.clear();

// Iterate through items
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(key, value);
}
```

### Use Cases
- User preferences (theme, language)
- Cached API responses
- Offline data for PWA
- Persistent application state

## Cookies

Cookies are small pieces of data sent to the server with each HTTP request. They have size limitations and expiration dates.

### Characteristics
- **Scope**: Can be domain or path-specific
- **Storage Limit**: ~4 KB per cookie
- **Lifetime**: Set via expiration date or session-based
- **Access**: Sent to server with every request
- **Security**: Can be httpOnly, secure, sameSite

### Usage

```javascript
// Set cookie (basic)
document.cookie = "username=John";

// Set cookie with expiration
document.cookie = "username=John; expires=Thu, 18 Dec 2025 12:00:00 UTC";

// Set cookie with path
document.cookie = "username=John; path=/";

// Set secure cookie (HTTPS only)
document.cookie = "token=abc123; secure";

// Set httpOnly cookie (JavaScript cannot access)
// Must be set server-side: Set-Cookie: token=abc123; HttpOnly

// Get all cookies
const cookies = document.cookie; // "username=John; theme=dark"

// Get specific cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Delete cookie (set expiration in past)
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

### Cookie Helper Functions

```javascript
// Set cookie with options
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Get cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Delete cookie
function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}
```

### Use Cases
- Authentication tokens
- Session IDs
- User tracking/analytics
- Small configuration data

## Comparison Table

| Feature | Session Storage | Local Storage | Cookies |
|---------|----------------|---------------|---------|
| **Capacity** | ~5-10 MB | ~5-10 MB | ~4 KB |
| **Lifetime** | Tab/window session | Until cleared | Set expiration |
| **Server Access** | No | No | Yes (sent with requests) |
| **Scope** | Same tab only | Same origin (all tabs) | Domain/path specific |
| **Storage Type** | Key-value pairs | Key-value pairs | Key-value pairs |
| **Access** | JavaScript only | JavaScript only | JavaScript + Server |

## Best Practices

1. **Session Storage**: Use for temporary, session-specific data
2. **Local Storage**: Use for persistent user preferences and cached data
3. **Cookies**: Use for small data that needs to be sent to server (auth tokens)
4. **Always handle errors**: Storage might be disabled or quota exceeded
5. **Serialize complex data**: Use `JSON.stringify()` and `JSON.parse()`

## Error Handling

```javascript
try {
  localStorage.setItem("key", "value");
} catch (e) {
  if (e.name === "QuotaExceededError") {
    console.error("Storage quota exceeded");
  } else if (e.name === "SecurityError") {
    console.error("Storage access denied");
  }
}
```

## Key Points
- **Session Storage**: Temporary, tab-specific storage
- **Local Storage**: Persistent, cross-tab storage
- **Cookies**: Small data sent to server with requests
- Choose based on lifetime, scope, and server access requirements
- Always handle storage errors and quota limitations

