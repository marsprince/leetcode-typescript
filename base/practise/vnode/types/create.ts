export type VNode = VNodeElement | string | number;
export type DOMNode = Node;

export interface VNodeProps {
  [key: string]: string | number;
}

export interface VNodeElement {
  tagName?: string;
  props?: VNodeProps;
  children?: VNode[];
  key?: string | number;
}

export interface QueueNode {
  vnode: VNode;
  parentElement?: DOMNode;
}
