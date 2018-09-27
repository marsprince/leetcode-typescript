interface SingleNode {
  val: any;
  next?: SingleNode;
}

class LinkedListNode {
  constructor(Node) {
    
  }
}

function nodeToNumber(node: SingleNode): number {
  const result = [];
  while (node.next !== null) {
    result.unshift(node.val);
  }
  return Number(result.join(''));
}

function numberToNode() {

}

export const addTwoNumbers = (l1: SingleNode, l2: SingleNode): SingleNode => {
  const l1Num = nodeToNumber(l1);
  const l2Num = nodeToNumber(l2);
  const resultNum = l1Num + l2Num;

};