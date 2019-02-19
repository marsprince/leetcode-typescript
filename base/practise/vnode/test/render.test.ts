import { diff } from '../diff.vnode';
import { patch } from '../patch.vnode';
import { createNodeTree } from '../create.vnode';

const demoNode1 = {
  tagName: 'ul',
  props: { class: 'demo1' },
  children: [
    { tagName: 'li', children: ['douyin'] },
    { tagName: 'li', children: ['fb'], key: 'a' },
    { tagName: 'li', children: ['twitter'], key: 'b' },
    { tagName: 'li', children: ['toutiao'] },
  ],
};

const demoNode2 = {
  tagName: 'ul',
  props: { class: 'demo2', id: 'test' },
  children: [
    { tagName: 'li', children: ['toutiao'] },
    { tagName: 'li', children: ['google'], key: 'c' },
    { tagName: 'li', children: ['toutiao'], key: 'a'},
    { tagName: 'li', children: ['google'] , key: 'b'},
    { tagName: 'li', children: ['xx'] },
    '123',
  ],
};

// const oldNode = createNodeTree(demoNode1);
const patchObj = diff(demoNode1, demoNode2);
// const newNode = patch(oldNode, patchObj);
console.log(patchObj.children);