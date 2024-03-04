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

console.log("Forwarding packet to 10.0.0.0:", routingTable.forward("10.0.0.0")); // Forward packet to next hop
console.log(
  "Forwarding packet to 192.168.1.0:",
  routingTable.forward("192.168.1.0")
); // Forward packet to next hop
