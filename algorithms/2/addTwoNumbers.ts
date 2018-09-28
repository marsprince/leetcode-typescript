import { SingleNode } from '../../structures/linked-list';

export function nodeToNumberArray(node: SingleNode): number[] {
  const result = [];
  let point = node;
  while (point.next) {
    result.push(Number(point.val));
    point = point.next;
  }
  result.push(Number(point.val));
  return result;
}

export const addTwoNumbers = (l1: SingleNode, l2: SingleNode): number[] => {
  const l1Num = nodeToNumberArray(l1);
  const l2Num = nodeToNumberArray(l2);
  const result: number[] = [];
  let next = 0;
  if (l1Num.length === 1 && l1Num[0] === 0) {
    return l2Num;
  }
  if (l2Num.length === 1 && l2Num[0] === 0) {
    return l1Num;
  }
  for (let i = 0, j = 0; i < l1Num.length || j < l2Num.length; i++, j++) {
    let addResult = Number(l1Num[i] ? l1Num[i] : 0) + Number(l2Num[j] ? l2Num[j] : 0) + next;
    let isAdd = false;
    if (addResult > 9) {
      addResult = addResult % 10;
      isAdd = true;
    }
    result.push(addResult);
    next = isAdd ? 1 : 0;
  }
  if (next) {
    result.push(next);
  }

  return result;
};