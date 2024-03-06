class TreeNode {
  val;
  left;
  right;
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function findHeight(root) {
  if (root === null) return -1;

  return Math.max(findHeight(root.left), findHeight(root.right)) + 1;
}

const root = new TreeNode(5);
root.left = new TreeNode(3);
root.right = new TreeNode(8);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(7);
root.right.right = new TreeNode(9);

console.log(root);
const res = findHeight(root);
console.log(res);

