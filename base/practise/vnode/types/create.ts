export type VNode = VNodeElement | string | number;
export type DOMNode = Node;

export interface VNodeProps {
  [key: string]: string | number;
}

export interface VNodeElement {
  tagName?: string;
  props?: VNodeProps;
  children?: VNode[];
}

export interface QueueNode {
  vnode: VNode;
  parentElement?: DOMNode;
}
