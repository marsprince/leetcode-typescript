export type VNode = VNodeElement | string;
export type DOMNode = HTMLElement | Text;

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
