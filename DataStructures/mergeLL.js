class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(data) {
    let node = new Node(data);
    let current;
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }
  show() {
    let temp = this.head;
    while (temp) {
      console.log(temp.data);
      temp = temp.next;
    }
  }

  mergeNodes(a, b) {
    let temp = new Node(null);
    let prev = temp;
    while (a !== null && b !== null) {
      if (a.data <= b.data) {
        prev.next = a;
        a = a.next;
      } else {
        prev.next = b;
        b = b.next;
      }
      prev = prev.next;
    }

    if (a == null) prev.next = b;
    if (b == null) prev.next = a;
    return temp;
  }

  



}

var a = new LinkedList();
var b = new LinkedList();
var c = new LinkedList();

a.add(2);
a.add(3);
a.add(4);

b.add(6);
b.add(7);
b.add(8);

// const result = c.mergeNodes(a, b);

console.log(c.mergeNodes(a,b));

a.show();
b.show();
