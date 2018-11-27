import { VNode, VNodeProps, VNodeElement, DOMNode, QueueNode } from './types';

function createNode(vnode: VNode): DOMNode {
  const doc = document;
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return doc.createTextNode(vnode.toString());
  } else {
    const { tagName, props } = vnode;
    const element = doc.createElement(tagName);
    setProps(element, props);
    return element;
  }
}

function setProps(element: HTMLElement, props: VNodeProps) {
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      element.setAttribute(key, props[key].toString());
    }
  }
}

export function createElement(vnode: VNode): DOMNode {
  const doc = document;
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return doc.createTextNode(vnode.toString());
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
        const children: any = (node as VNodeElement).children;
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
