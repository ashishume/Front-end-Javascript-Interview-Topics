# Authentication vs Authorization in JavaScript

## Overview
Authentication and Authorization are two fundamental security concepts in web development. While often confused, they serve different purposes: Authentication verifies **who** you are, while Authorization determines **what** you can do.

## Authentication

Authentication means the user needs to have username and password to access the portal or system. Basically, it means **who can access the system**.

### Examples:
- OAuth (Google, Facebook login)
- Two-Step Authentication (2FA)
- Username and password
- Biometric authentication
- JWT tokens
- Session-based authentication

### Implementation Example

```javascript
// Authentication - Verifying user identity
async function authenticateUser(username, password) {
  const user = await db.findUser(username);
  
  if (!user) {
    throw new Error("User not found");
  }
  
  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    throw new Error("Invalid credentials");
  }
  
  // User is authenticated - create session/token
  const token = generateToken(user);
  return { user, token };
}
```

## Authorization

Authorization means that the authenticated user is allowed to do what things. It determines **what permissions** the authenticated user has.

### Examples:
- Manager role
- Admin role
- Stakeholder role
- Read-only access
- Write access
- Delete permissions

### Implementation Example

```javascript
// Authorization - Checking permissions
function checkPermission(user, action, resource) {
  const userRole = user.role;
  const permissions = getRolePermissions(userRole);
  
  return permissions.includes(`${action}:${resource}`);
}

// Usage
if (checkPermission(user, "delete", "users")) {
  // Allow deletion
} else {
  throw new Error("Unauthorized");
}
```

## Key Differences

| Aspect | Authentication | Authorization |
|--------|---------------|---------------|
| **Purpose** | Verify identity | Verify permissions |
| **Question** | Who are you? | What can you do? |
| **Timing** | Happens first | Happens after authentication |
| **Methods** | Login, OAuth, 2FA | Roles, Permissions, ACL |
| **Result** | User identity | Access rights |

## Complete Example

### Authentication System
```javascript
class AuthSystem {
  async login(username, password) {
    // Authentication: Verify who you are
    const user = await this.authenticate(username, password);
    
    if (!user) {
      throw new Error("Authentication failed");
    }
    
    // Create session/token
    const token = this.generateToken(user);
    return { user, token };
  }
  
  async authenticate(username, password) {
    const user = await db.findUser(username);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.hashedPassword);
    return isValid ? user : null;
  }
  
  generateToken(user) {
    return jwt.sign(
      { userId: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: "24h" }
    );
  }
}
```

### Authorization System
```javascript
class AuthorizationSystem {
  constructor() {
    this.permissions = {
      admin: ["read", "write", "delete", "manage"],
      manager: ["read", "write"],
      user: ["read"],
      guest: []
    };
  }
  
  // Authorization: Check what you can do
  can(user, action, resource) {
    const role = user.role;
    const rolePermissions = this.permissions[role] || [];
    
    return rolePermissions.includes(action);
  }
  
  require(user, action, resource) {
    if (!this.can(user, action, resource)) {
      throw new Error(`Unauthorized: Cannot ${action} ${resource}`);
    }
  }
}

// Usage
const auth = new AuthSystem();
const authz = new AuthorizationSystem();

// Step 1: Authenticate
const { user, token } = await auth.login("john", "password123");

// Step 2: Authorize
authz.require(user, "delete", "users"); // Check permission before action
```

## Middleware Pattern

### Express.js Example
```javascript
// Authentication Middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Authorization Middleware
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    
    next();
  };
}

// Usage
app.delete("/users/:id", 
  authenticate,           // First: Who are you?
  authorize("admin"),     // Then: Can you do this?
  deleteUser
);
```

## Role-Based Access Control (RBAC)

```javascript
class RBAC {
  constructor() {
    this.roles = {
      admin: {
        users: ["create", "read", "update", "delete"],
        posts: ["create", "read", "update", "delete"],
        settings: ["read", "update"]
      },
      editor: {
        posts: ["create", "read", "update"],
        users: ["read"]
      },
      viewer: {
        posts: ["read"],
        users: ["read"]
      }
    };
  }
  
  hasPermission(user, resource, action) {
    const role = user.role;
    const rolePermissions = this.roles[role];
    
    if (!rolePermissions) return false;
    if (!rolePermissions[resource]) return false;
    
    return rolePermissions[resource].includes(action);
  }
  
  checkPermission(user, resource, action) {
    if (!this.hasPermission(user, resource, action)) {
      throw new Error(`User ${user.id} cannot ${action} ${resource}`);
    }
  }
}
```

## JWT Implementation

```javascript
// Authentication: Create token
function authenticate(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };
  
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
}

// Authorization: Verify token and check permissions
function authorize(requiredRole) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      
      // Check authorization
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}
```

## Best Practices

1. **Always Authenticate First**: Verify identity before checking permissions
2. **Principle of Least Privilege**: Grant minimum necessary permissions
3. **Separate Concerns**: Keep auth and authz logic separate
4. **Token Expiration**: Set appropriate token lifetimes
5. **Secure Storage**: Store tokens securely (httpOnly cookies)
6. **Role Validation**: Always validate roles on server side
7. **Audit Logging**: Log authentication and authorization events

## Common Patterns

### Pattern 1: Protected Route
```javascript
function protectRoute(handler) {
  return async (req, res) => {
    // Authenticate
    const user = await authenticateUser(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthenticated" });
    }
    
    // Authorize
    if (!hasPermission(user, req.route.path, req.method)) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    // Execute handler
    return handler(req, res);
  };
}
```

### Pattern 2: Permission Decorator
```javascript
function requirePermission(resource, action) {
  return (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
      const user = this.getCurrentUser();
      
      if (!this.authz.can(user, action, resource)) {
        throw new Error("Unauthorized");
      }
      
      return originalMethod.apply(this, args);
    };
    
    return descriptor;
  };
}
```

## Real-World Example

```javascript
class SecureAPI {
  constructor() {
    this.users = new Map();
    this.sessions = new Map();
  }
  
  // Authentication
  async login(username, password) {
    const user = this.users.get(username);
    
    if (!user || user.password !== password) {
      throw new Error("Authentication failed");
    }
    
    const sessionId = generateSessionId();
    this.sessions.set(sessionId, {
      userId: user.id,
      role: user.role,
      expiresAt: Date.now() + 3600000
    });
    
    return { sessionId, user: { id: user.id, role: user.role } };
  }
  
  // Authorization
  canAccess(sessionId, resource, action) {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    
    const permissions = this.getPermissions(session.role);
    return permissions[resource]?.includes(action) || false;
  }
  
  getPermissions(role) {
    const permissionMap = {
      admin: {
        users: ["read", "write", "delete"],
        posts: ["read", "write", "delete"]
      },
      user: {
        posts: ["read", "write"],
        users: ["read"]
      }
    };
    
    return permissionMap[role] || {};
  }
}
```
