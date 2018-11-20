export interface VNode {
  tag?: string;
  data?: VNodeData;
  children?: VNode[];
  text?: string;
  elm?: Node;
  ns?: string;
  context?: Vue;
  key?: string | number;
  componentOptions?: VNodeComponentOptions;
  componentInstance?: Vue;
  parent?: VNode;
  raw?: boolean;
  isStatic?: boolean;
  isRootInsert: boolean;
  isComment: boolean;
}

interface ReactElement<P> {
  type: string | ComponentClass<P> | SFC<P>;
  props: P;
  key: Key | null;
}

interface ReactPortal extends ReactElement<any> {
  key: Key | null;
  children: ReactNode;
}

type ReactText = string | number;
type ReactChild = ReactElement<any> | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;