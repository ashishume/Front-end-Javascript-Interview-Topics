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
  insertAt(data, index) {
    if (index > 0 && index > this.size) return;

    let node = new Node(data);
    let current, previous;
    if (index == 0) {
      this.head = node;
      return;
    } else {
      current = this.head;
      let count = 0;
      while (count < index) {
        previous = current;
        count++;
        current = current.next;
      }

      node.next = current;
      previous.next = node;
      this.size++;
    }
  }
  show() {
    let temp = this.head;
    let str = "";
    while (temp) {
      str += temp.data;
      temp = temp.next;
    }
    console.log(parseInt(str.split("").reverse().join("")));
  }
}

var ll = new LinkedList();

ll.add(2);
ll.add(4);
// ll.insertAt(55,2)
ll.add(3);

ll.show();
