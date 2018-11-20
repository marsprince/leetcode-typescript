export interface VNodeProps {
  [key: string]: string | number;
}

export interface VNodeElement {
  tagName?: string;
  props?: VNodeProps;
  children?: VNode[];
}

export type VNode = VNodeElement | string;