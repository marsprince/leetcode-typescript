import { diff } from '../diff.vnode';

const demoNode1 = {
  tagName: 'ul',
  props: { class: 'demo1', id: 'test' },
  children: [
    { tagName: 'li', children: ['douyin'] },
    { tagName: 'li', children: ['toutiao'] },
  ],
};

const demoNode2 = {
  tagName: 'ul',
  props: { class: 'demo2' },
  children: [
    { tagName: 'li', children: ['google'] },
    { tagName: 'li', children: ['fb'] },
  ],
};

console.log(diff(demoNode1, demoNode2));