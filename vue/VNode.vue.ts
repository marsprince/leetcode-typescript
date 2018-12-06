export interface VNode {
  tag?: string;
  data?: VNodeData;
  children?: VNode[]; // 子节点
  text?: string;
  elm?: Node; // 对应的dom节点
  ns?: string;
  context?: Vue;  // 当前的根节点实例
  key?: string | number; // key
  componentOptions?: VNodeComponentOptions; // 如果这个节点是一个vue组件，这里面会记录这个组件的一些options
  componentInstance?: Vue; // 如果这个节点是一个vue组件，这里面会记录这个组件的实例
  parent?: VNode; // 父节点
  raw?: boolean;
  isStatic?: boolean;
  isRootInsert: boolean;
  isComment: boolean;
}

export interface VNodeData {
  key?: string | number;
  slot?: string;
  scopedSlots?: { [key: string]: ScopedSlot };
  ref?: string;
  tag?: string;
  staticClass?: string;
  class?: any;
  staticStyle?: { [key: string]: any };
  style?: object[] | object;
  props?: { [key: string]: any };
  attrs?: { [key: string]: any };
  domProps?: { [key: string]: any };
  hook?: { [key: string]: Function };
  on?: { [key: string]: Function | Function[] };
  nativeOn?: { [key: string]: Function | Function[] };
  transition?: object;
  show?: boolean;
  inlineTemplate?: {
    render: Function;
    staticRenderFns: Function[];
  };
  directives?: VNodeDirective[];
  keepAlive?: boolean;
}


export interface VNodeComponentOptions {
  Ctor: typeof Vue;
  propsData?: object;
  listeners?: object;
  children?: VNodeChildren;
  tag?: string;
}
