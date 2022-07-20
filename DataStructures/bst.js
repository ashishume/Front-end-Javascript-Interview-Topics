class NodeClass {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BSTNode {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new NodeClass(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertChildNodes(this.root, newNode);
    }
  }

  insertChildNodes(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertChildNodes(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertChildNodes(node.right, newNode);
      }
    }
  }
  preOrdertraversal(root) {
    if (root == null) return root;

    console.log(root.data); //pre order traversal
    if (root.left) this.preOrdertraversal(root.left);
    if (root.right) this.preOrdertraversal(root.right);
  }

  height(root) {
    if (root === null) return 0;
    return Math.max(this.height(root.left), this.height(root.right)) + 1;
  }

  levelOrderTraversal(root) {
    if (root === null) return;
    let queue = [root];
    while (queue.length) {
      const h = queue.length;
      for (let i = 0; i < h; i++) {
        let node = queue.pop();
        console.log(node.data);
        if (node.left) queue.unshift(node.left);
        if (node.right) queue.unshift(node.right);
      }
    }
  }
  countNodes(root) {
    if (root === null) return 0;
    return this.countNodes(root.left) + this.countNodes(root.right) + 1;
  }
}

const node1 = new BSTNode();
node1.insert(50);
node1.insert(30);
node1.insert(10);
node1.insert(40);
node1.insert(70);
node1.insert(60);
node1.insert(80);

console.log(node1);
// console.log(node1.preOrdertraversal(node1.root));
// const h = node1.height(node1.root);
// console.log(node1.countNodes(node1.root));

// for (let i = 1; i <= h; i++)

// const a = node1.levelOrderTraversal(node1.root);

const b = node1.verticalTraversal(node1.root);
console.log(b);
