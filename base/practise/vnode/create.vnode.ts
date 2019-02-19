import { VNode, VNodeProps, VNodeElement, DOMNode, QueueNode } from './types';

const doc = document;

/**
 * 创建单一dom
 * @param vnode
 */
function createNode(vnode: VNode): DOMNode {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return doc.createTextNode(vnode.toString());
  } else {
    const { tagName, props } = vnode;
    const element = doc.createElement(tagName);
    setProps(element, props);
    return element;
  }
}

/**
 * 设置属性
 * @param element
 * @param props
 */
function setProps(element: HTMLElement, props: VNodeProps) {
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      element.setAttribute(key, props[key].toString());
    }
  }
}

/**
 * 创建dom树
 * @param vnode
 */
export function createNodeTree(vnode: VNode): DOMNode {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return doc.createTextNode(vnode.toString());
  }
  let result: any;
  if (vnode.children && vnode.children.length !== 0) {
    const queue: QueueNode[] = [{
      vnode,
    }];
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
        const children = (node as VNodeElement).children;
        if (Array.isArray(children) && children.length !== 0) {
          children.forEach(nextNode => {
            queue.push({
              vnode: nextNode,
              parentElement: element,
            });
          });
        }
      }
    }
  } else {
    result = createNode(vnode);
  }
  return result;
}
