/*
//样例数据
let demoNode = ({
    tagName: 'ul',
    props: {'class': 'list'},
    children: [
        ({tagName: 'li', children: ['douyin']}),
        ({tagName: 'li', children: ['toutiao']})
    ]
});

//构建一个render函数，将demoNode对象渲染为以下dom
<ul class="list">
    <li>douyin</li>
    <li>toutiao</li>
</ul>
 */

import { VNode, VNodeProps } from '../../type/test';

interface QueueNode {
  vnode: VNode;
  parentElement?: HTMLElement | Text;
}

function createNode(vnode: VNode): HTMLElement | Text {
  const doc = document;
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return doc.createTextNode(vnode);
  } else {
    const { tagName, props } = vnode;
    const element = doc.createElement(tagName);
    setProps(element, props);
    return element;
  }
}

function createElement(vnode: VNode): any {
  const doc = document;
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return doc.createTextNode(vnode);
  }

  // 3.循环
  // 1.循环一层的
  const queue: QueueNode[] = [{
    vnode,
  }];
  let result: any;
  if (vnode.children && vnode.children.length !== 0) {
    while (queue.length !== 0) {
      const el = queue.shift();
      const element = createNode(el.vnode);

      if (el.parentElement) {
        el.parentElement.appendChild(element);
      } else {
        result = element;
      }
      if (typeof el.vnode !== 'string') {
        const node: VNode = el.vnode;
        const children: any = node.children;
        if (Array.isArray(children) && children.length !== 0) {
          node.children.forEach(nextNode => {
            queue.push({
              vnode: nextNode,
              parentElement: element,
            });
          });
        }
      }
    }
  }
  return result;
}

function setProps(element: HTMLElement, props: VNodeProps) {
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      element.setAttribute(key, props[key].toString());
    }
  }
}

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
console.log(createElement(dataNode));