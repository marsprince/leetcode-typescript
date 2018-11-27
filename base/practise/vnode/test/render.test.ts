import { diff } from '../diff.vnode';
import { patch } from '../patch.vnode';
import { createElement } from '../create.vnode';

const demoNode1 = {
  tagName: 'ul',
  props: { class: 'demo1' },
  children: [
    { tagName: 'li', children: ['douyin'] },
    { tagName: 'li', children: ['toutiao'] },
  ],
};

const demoNode2 = {
  tagName: 'ul',
  props: { class: 'demo2', id: 'test' },
  children: [
    { tagName: 'li', children: ['douyin'] },
    { tagName: 'li', children: ['fb'] },
    {
      tagName: 'li', children: [
        { tagName: 'li', children: ['douyin'] },
        { tagName: 'li', children: ['fb'] },
        { tagName: 'li', children: ['test'] },
      ],
    },
    {
      tagName: 'div', children: [],
    },
  ],
};

const oldNode = createElement(demoNode1);
const patchObj = diff(demoNode1, demoNode2);
const newNode = patch(oldNode, patchObj);
console.log(newNode);