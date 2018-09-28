export class SingleNode {
  constructor(
    public val: any,
    public next?: SingleNode) {
  }
}

export class LinkedListNode {
  private head: SingleNode;

  constructor(node: SingleNode) {
    this.head = node;
  }
}