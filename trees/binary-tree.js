/** BinaryTreeNode: node for a binary tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth(node = this.root) {
    if (node === null) return 0;

    if (!node.left && !node.right) return 1;

    if (!node.left) return this.minDepth(node.right) + 1;
    if (!node.right) return this.minDepth(node.left) + 1;

    return Math.min(this.minDepth(node.left), this.minDepth(node.right)) + 1;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth(node = this.root) {
    if (node === null) return 0;

    let leftDepth = this.maxDepth(node.left);
    let rightDepth = this.maxDepth(node.right);

    return Math.max(leftDepth, rightDepth) + 1;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum() {
    if (this.root === null) return 0; // handle empty tree case

    let result = { max: -Infinity };

    function helper(node) {
      if (node === null) return 0;

      let leftSum = Math.max(helper(node.left), 0);
      let rightSum = Math.max(helper(node.right), 0);

      let currentSum = node.val + leftSum + rightSum;

      result.max = Math.max(result.max, currentSum);

      return node.val + Math.max(leftSum, rightSum);
    }

    helper(this.root);
    return result.max;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(lowerBound) {
    let nextLargerValue = null;

    function traverse(node) {
      if (node === null) return;

      if (node.val > lowerBound) {
        if (nextLargerValue === null || node.val < nextLargerValue) {
          nextLargerValue = node.val;
        }
      }

      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
    return nextLargerValue;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
