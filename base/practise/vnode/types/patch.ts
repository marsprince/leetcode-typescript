import { VNode } from './create';

export interface PatchVNodeProps {
  type: NodePropsTypes;
  key: string;
  value?: string | number;
}

export interface PatchObject {
  type: NodePatchTypes;
  vnode: VNode;
  props?: PatchVNodeProps[];
  children?: PatchObject[];
  childIndex?: number;
}

export enum NodePatchTypes {
  CREATE = 'create node', // 旧节点为空，新节点不为空，直接新建新节点
  REMOVE = 'remove node', // 旧节点不为空，新节点为空，直接删除旧节点
  REPLACE = 'replace node', // 新旧节点都有，但是不是相同节点，直接用新节点替换旧节点
  UPDATE = 'update node', // 新旧节点相同，且是相同节点，进入propsPatch
}

export enum NodePropsTypes {
  REMOVE = 'remove prop',
  UPDATE = 'update prop',
}