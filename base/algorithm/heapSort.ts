// 堆排序
// 什么是堆：堆是完全二叉树，分最大堆（根最大）和最小堆（根最小）
// 堆有唯一索引，类似数组，因此一个数组就可以看成是一个堆
// 核心，每次构造一个最大（小）堆，因为它能保证根是最大的，第二大的无法保证
// 然后拿掉根元素，扔到数组最后，对剩下的堆排序，直至剩一个位置

// 整体逻辑
//

/* eslint-disable*/
// 堆是完全二叉树
// 二叉树性质
// 1.二叉树第i层上的结点数目最多为 2^(i-1) (i≥1)
// 3.包含n个结点的二叉树的高度至少为log2 (n+1)
class Heap {
  constructor(heapContainer = []) {
    this.heapContainer = heapContainer;
    // 包含n个结点的二叉树的高度至少为log2 (n+1)
  }

  private heapContainer;
  private height;

  // 设根节点编号为0
  // 第K层最左节点序号m = 第K-1层最多节点数 = 2^(K-1)-1
  // 第K+1层最左节点序号m1 2^K-1
  // m1 = 2m+1
  // 设第K层节点编号n，则K层位于n左边的节点数为n-m个，每多一个，下面出2个，因此下方序号相对左节点偏移 2*(n-m)个
  // n1 = m1+2*(n-m) = m1 + 2n - 2m = 2m +1  = 2n + 1
  // 证毕 使用性质2 深度为k的二叉树至多有2^k-1个结点(k≥1)
  getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  getRightChildIndex(index) {
    return this.getLeftChildIndex(index) + 1;
  }

  // 是否有左子节点
  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heapContainer.length;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heapContainer.length;
  }

  getParentIndex(leftChildIndex) {
    return (leftChildIndex - 1) / 2;
  }

  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

    // 返回根节点
    const root = this.heapContainer[0];
    // 交换根和最后一个节点
    this.heapContainer[0] = this.heapContainer.pop();
    // 重排
    this.heapifyDown();
    return root;
  }

  heapifyUp(startIndex = 0) {
    // 先假设传入的是开始索引
    // 1. 找它的父节点
    // 2. 比较
  }

  /**
   * 从头上下重新排序堆
   */
  heapifyDown(startIndex) {
    // 找出左、右和根三个结点中最大或最小
    let currentIndex = startIndex || 0;
    let nextIndex;
    // 如果有左子节点
    while (this.hasLeftChild(currentIndex)) {
      // 如果有右边的子节点并且右比左大（小）
      if (this.hasRightChild(currentIndex) && this.pairIsInCorrectOrder(this.)) {

      }
    }
  }

  pairIsInCorrectOrder(first, second) {
    return first > second;
  }
}

export function HeapSort(
  originArray,
) {
  const arr = [...originArray];
  let index = arr.length - 1;
  while (index-- > 0) {
    // 构建最大堆
  }
  return arr;
}
