import { createNodeTree } from '../create.vnode';

function createDemoNode(deep) {
  const result: any = {};
  let temp = result;
  for (let i = 0; i < deep; i++) {
    temp.tagName = 'ul';
    temp.props = { class: 'list' };
    temp.children = [
      { tagName: 'li', children: ['douyin'] },
    ];
    temp = temp.children[0];
  }
  return result;
}

const demoNode = {
  tagName: 'ul',
  props: { class: 'list' },
  children: [
    { tagName: 'li', children: ['douyin'] },
    { tagName: 'li', children: ['toutiao'] },
  ],
};

const dataNode = createDemoNode(2);
console.log(createNodeTree(dataNode));