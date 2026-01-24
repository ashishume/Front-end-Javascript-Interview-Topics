# Routing Table (CRUD) in JavaScript

## Overview
A Routing Table is a data structure that stores routing information, mapping destinations to next hops. This implementation demonstrates CRUD (Create, Read, Update, Delete) operations on a routing table, which is useful for understanding network routing concepts and implementing custom routing logic.

## Basic Implementation

```javascript
class RoutingTable {
  table;

  constructor() {
    this.table = [];
  }

  insert(destination, nextHop) {
    const index = this.table.findIndex(
      (value) => value.destination === destination
    );
    if (index !== -1) {
      return (this.table[index].nextHop = nextHop);
    }
    return this.table.push({ destination, nextHop });
  }

  delete(destination) {
    this.table = this.table.filter(
      (value) => value.destination !== destination
    );
  }

  forward(destination) {
    const entry = this.table.find((value) => value.destination === destination);
    return entry ? entry.nextHop : null;
  }
  
  print() {
    console.log(this.table);
  }
}

// Example usage:
const routingTable = new RoutingTable();
routingTable.insert("192.168.1.0", "192.168.1.1");
routingTable.insert("10.0.0.0", "10.0.0.1");
routingTable.print(); // Print the initial routing table

routingTable.delete("192.168.1.0");
routingTable.print(); // Print the routing table after deletion

console.log("Forwarding packet to 10.0.0.0:", routingTable.forward("10.0.0.0"));
console.log("Forwarding packet to 192.168.1.0:", routingTable.forward("192.168.1.0"));
```

## Enhanced Implementation

### With Additional Features
```javascript
class AdvancedRoutingTable {
  constructor() {
    this.table = new Map();
  }

  // Create/Update
  insert(destination, nextHop, options = {}) {
    const { metric = 0, interface = null } = options;
    
    this.table.set(destination, {
      nextHop,
      metric,
      interface,
      lastUpdated: Date.now()
    });
    
    return this.table.get(destination);
  }

  // Read
  get(destination) {
    return this.table.get(destination);
  }

  // Read all
  getAll() {
    return Array.from(this.table.entries()).map(([dest, data]) => ({
      destination: dest,
      ...data
    }));
  }

  // Update
  update(destination, updates) {
    const entry = this.table.get(destination);
    if (entry) {
      Object.assign(entry, updates, { lastUpdated: Date.now() });
      return entry;
    }
    return null;
  }

  // Delete
  delete(destination) {
    return this.table.delete(destination);
  }

  // Forward (route lookup)
  forward(destination) {
    const entry = this.table.get(destination);
    return entry ? entry.nextHop : null;
  }

  // Find best route (lowest metric)
  findBestRoute(destination) {
    const routes = Array.from(this.table.entries())
      .filter(([dest]) => dest.startsWith(destination))
      .sort((a, b) => a[1].metric - b[1].metric);
    
    return routes.length > 0 ? routes[0][1] : null;
  }

  // Clear expired routes
  clearExpired(maxAge = 3600000) {
    const now = Date.now();
    for (const [dest, data] of this.table.entries()) {
      if (now - data.lastUpdated > maxAge) {
        this.table.delete(dest);
      }
    }
  }
}
```

## Use Cases

### 1. Network Routing
```javascript
const router = new RoutingTable();
router.insert("192.168.1.0/24", "192.168.1.1");
router.insert("10.0.0.0/8", "10.0.0.1");
```

### 2. API Routing
```javascript
const apiRouter = new RoutingTable();
apiRouter.insert("/api/users", handleUsers);
apiRouter.insert("/api/posts", handlePosts);
```

### 3. URL Routing
```javascript
const urlRouter = new RoutingTable();
urlRouter.insert("/home", HomeComponent);
urlRouter.insert("/about", AboutComponent);
```

## Best Practices

1. **Use Map**: For better performance with lookups
2. **Validate Input**: Check destination and nextHop formats
3. **Handle Conflicts**: Decide on update vs insert behavior
4. **Expiration**: Implement route expiration for dynamic routing
5. **Metrics**: Use metrics for route selection
6. **Thread Safety**: Consider concurrency if needed
