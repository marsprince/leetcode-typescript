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