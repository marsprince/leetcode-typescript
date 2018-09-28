import { addTwoNumbers } from './addTwoNumbers';
import { SingleNode } from '../../structures/linked-list';

const l1 = new SingleNode(9, new SingleNode(9));
const l2 = new SingleNode(1);

console.log((addTwoNumbers(l2, l1)));