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

  findLoop() {
    let current = this.head;
    let prev = this.head;
    while (current && prev) {
      current = current.next.next;
      prev = prev.next;
      if (prev == current) return true;
    }

    return false;
  }
}

var ll = new LinkedList();

ll.add(2);
ll.add(4);
ll.add(3);
ll.add(5);
ll.add(7);
ll.add(4);
ll.add(9);

// ll.show();
const res = ll.findLoop();
console.log(res);
