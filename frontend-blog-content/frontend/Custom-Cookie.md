# Custom Cookie Implementation in JavaScript

## Overview
Creating a custom cookie implementation allows you to have more control over cookie management, including expiration handling, parsing, and storage. This is useful for understanding how cookies work internally and for creating cookie-like storage mechanisms.

## Basic Implementation

```javascript
/** Create a custom cookie */

function createCustomCookie() {
  let store = new Map();
  
  Object.defineProperty(document, "myCookie", {
    configurable: true,
    set: (strPath) => {
      const [nameValue, ...rest] = parseStr(strPath);
      const [key, value] = splitOptions(nameValue);
      let options = {};
      
      for (let obj of rest) {
        const [key, value] = splitOptions(obj);
        options[key] = value;
      }
      
      let expiry = Infinity;
      if (options["max-age"]) {
        expiry = Date.now() + Number(options["max-age"]) * 1000;
      }
      
      store.set(key, { value, expiry });
    },
    get: () => {
      let cookies = [];
      const time = Date.now();
      
      for (let [key, { value, expiry }] of store) {
        if (expiry <= time) {
          store.delete(key);
        } else {
          cookies.push(`${key}=${value}`);
        }
      }
      
      return cookies.join("; ");
    },
  });

  function parseStr(strPath) {
    return strPath.split(";").map((val) => val.trim());
  }
  
  function splitOptions(obj) {
    return obj.split("=").map((v) => v.trim());
  }
}

createCustomCookie();

// Usage
document.myCookie = "name=Ashish;max-age=1";
document.myCookie = "blog=Akash";
console.log(document.myCookie);
setTimeout(() => {
  console.log(document.myCookie);
}, 1500);
```

## Enhanced Implementation

```javascript
class CustomCookie {
  constructor() {
    this.store = new Map();
    this.setup();
  }

  setup() {
    const self = this;
    
    Object.defineProperty(document, "customCookie", {
      configurable: true,
      enumerable: true,
      set: function(str) {
        self.setCookie(str);
      },
      get: function() {
        return self.getCookies();
      }
    });
  }

  parseCookieString(str) {
    const parts = str.split(";").map(part => part.trim());
    const [nameValue, ...options] = parts;
    const [name, value] = nameValue.split("=").map(v => v.trim());
    
    const cookieOptions = {};
    options.forEach(option => {
      const [key, val] = option.split("=").map(v => v.trim());
      cookieOptions[key.toLowerCase()] = val || true;
    });
    
    return { name, value, options: cookieOptions };
  }

  setCookie(str) {
    const { name, value, options } = this.parseCookieString(str);
    
    let expiry = Infinity;
    if (options["max-age"]) {
      expiry = Date.now() + Number(options["max-age"]) * 1000;
    } else if (options.expires) {
      expiry = new Date(options.expires).getTime();
    }
    
    this.store.set(name, {
      value,
      expiry,
      path: options.path || "/",
      domain: options.domain,
      secure: options.secure || false,
      samesite: options.samesite || "Lax"
    });
  }

  getCookies() {
    const cookies = [];
    const now = Date.now();
    
    for (const [name, data] of this.store.entries()) {
      if (data.expiry <= now) {
        this.store.delete(name);
      } else {
        cookies.push(`${name}=${data.value}`);
      }
    }
    
    return cookies.join("; ");
  }

  getCookie(name) {
    const data = this.store.get(name);
    if (!data) return null;
    
    if (data.expiry <= Date.now()) {
      this.store.delete(name);
      return null;
    }
    
    return data.value;
  }

  deleteCookie(name) {
    this.store.delete(name);
  }

  clear() {
    this.store.clear();
  }
}

// Usage
const cookieManager = new CustomCookie();
document.customCookie = "username=john;max-age=3600";
document.customCookie = "theme=dark;max-age=7200";
console.log(document.customCookie);
```

## Advanced Features

### 1. Cookie with Path and Domain
```javascript
class AdvancedCookie {
  constructor() {
    this.store = new Map();
  }

  set(name, value, options = {}) {
    const {
      maxAge,
      expires,
      path = "/",
      domain,
      secure = false,
      sameSite = "Lax"
    } = options;

    let expiry = Infinity;
    if (maxAge) {
      expiry = Date.now() + maxAge * 1000;
    } else if (expires) {
      expiry = new Date(expires).getTime();
    }

    this.store.set(name, {
      value,
      expiry,
      path,
      domain,
      secure,
      sameSite
    });
  }

  get(name) {
    const cookie = this.store.get(name);
    if (!cookie) return null;

    if (cookie.expiry <= Date.now()) {
      this.store.delete(name);
      return null;
    }

    return cookie.value;
  }

  getAll() {
    const cookies = {};
    const now = Date.now();

    for (const [name, data] of this.store.entries()) {
      if (data.expiry <= now) {
        this.store.delete(name);
      } else {
        cookies[name] = data.value;
      }
    }

    return cookies;
  }

  remove(name) {
    this.store.delete(name);
  }
}
```

### 2. Cookie with Auto-Cleanup
```javascript
class AutoCleanupCookie {
  constructor() {
    this.store = new Map();
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000); // Clean every minute
  }

  cleanup() {
    const now = Date.now();
    for (const [name, data] of this.store.entries()) {
      if (data.expiry <= now) {
        this.store.delete(name);
      }
    }
  }

  set(name, value, maxAge) {
    const expiry = maxAge ? Date.now() + maxAge * 1000 : Infinity;
    this.store.set(name, { value, expiry });
  }

  get(name) {
    const cookie = this.store.get(name);
    if (!cookie) return null;

    if (cookie.expiry <= Date.now()) {
      this.store.delete(name);
      return null;
    }

    return cookie.value;
  }

  destroy() {
    clearInterval(this.cleanupInterval);
    this.store.clear();
  }
}
```

## Use Cases

### 1. Session Management
```javascript
const sessionCookie = new CustomCookie();
sessionCookie.set("sessionId", generateSessionId(), { maxAge: 3600 });
```

### 2. User Preferences
```javascript
const prefsCookie = new CustomCookie();
prefsCookie.set("theme", "dark", { maxAge: 31536000 }); // 1 year
prefsCookie.set("language", "en", { maxAge: 31536000 });
```

### 3. Analytics
```javascript
const analyticsCookie = new CustomCookie();
analyticsCookie.set("visitorId", generateVisitorId(), { maxAge: 63072000 }); // 2 years
```

## Comparison with Native Cookies

### Native Cookie
```javascript
// Native cookie API
document.cookie = "name=value;max-age=3600";
document.cookie = "theme=dark;max-age=7200";
console.log(document.cookie); // "name=value; theme=dark"
```

### Custom Cookie
```javascript
// Custom cookie API
document.myCookie = "name=value;max-age=3600";
document.myCookie = "theme=dark;max-age=7200";
console.log(document.myCookie); // "name=value; theme=dark"
```

## Best Practices

1. **Expiration Handling**: Always check and remove expired cookies
2. **Memory Management**: Clean up expired cookies regularly
3. **Error Handling**: Validate cookie strings before parsing
4. **Security**: Consider security attributes (secure, sameSite)
5. **Size Limits**: Be aware of cookie size limitations
6. **Encoding**: Handle special characters in cookie values

## Limitations

1. **Storage**: Custom cookies are stored in memory, not persisted
2. **Browser Integration**: Not automatically sent with HTTP requests
3. **Domain/Path**: Need manual implementation for domain/path matching
4. **Size**: Limited by available memory, not browser cookie limits

## Real-World Example

```javascript
class CookieManager {
  constructor() {
    this.cookies = new Map();
    this.setupAutoCleanup();
  }

  setupAutoCleanup() {
    setInterval(() => {
      const now = Date.now();
      for (const [name, data] of this.cookies.entries()) {
        if (data.expiry <= now) {
          this.cookies.delete(name);
        }
      }
    }, 60000);
  }

  set(name, value, options = {}) {
    const { maxAge, expires } = options;
    let expiry = Infinity;

    if (maxAge) {
      expiry = Date.now() + maxAge * 1000;
    } else if (expires) {
      expiry = new Date(expires).getTime();
    }

    this.cookies.set(name, { value, expiry });
  }

  get(name) {
    const cookie = this.cookies.get(name);
    if (!cookie) return null;

    if (cookie.expiry <= Date.now()) {
      this.cookies.delete(name);
      return null;
    }

    return cookie.value;
  }

  remove(name) {
    this.cookies.delete(name);
  }

  clear() {
    this.cookies.clear();
  }

  getAll() {
    const result = {};
    const now = Date.now();

    for (const [name, data] of this.cookies.entries()) {
      if (data.expiry > now) {
        result[name] = data.value;
      } else {
        this.cookies.delete(name);
      }
    }

    return result;
  }
}

// Usage
const cookieManager = new CookieManager();
cookieManager.set("userId", "12345", { maxAge: 3600 });
cookieManager.set("preferences", JSON.stringify({ theme: "dark" }), { maxAge: 86400 });

console.log(cookieManager.get("userId")); // "12345"
console.log(cookieManager.getAll()); // { userId: "12345", preferences: "..." }
```
