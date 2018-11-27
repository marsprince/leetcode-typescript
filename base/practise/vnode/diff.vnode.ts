import { VNode, VNodeElement } from './types';
import { NodePatchTypes, NodePropsTypes, PatchObject, PatchVNodeProps } from './types/patch';
import { isUndefined, isSameVNode } from './util';

function diffProps(oldVNode: VNodeElement, newVNode: VNodeElement): PatchVNodeProps[] {
  const result: PatchVNodeProps[] = [];
  const allProps: VNodeElement = { ...oldVNode.props, ...newVNode.props };
  return Object.keys(allProps).reduce((total, key) => {
    const oldValue = oldVNode.props[key];
    const newValue = newVNode.props[key];
    if (!isUndefined(newValue)) {
      if (isUndefined(oldValue) || oldValue !== newValue) {
        total.push({
          type: NodePropsTypes.UPDATE,
          [key]: newValue,
        });
      }
    } else {
      total.push({
        type: NodePropsTypes.REMOVE,
        [key]: oldValue,
      });
    }
    return total;
  }, result);
}

function diffChildrens(oldVNodeChildrens: VNode[], newVNodeChildrens: VNode[]): PatchObject[] {
  const maxLength = Math.max(oldVNodeChildrens.length, newVNodeChildrens.length);
  const patches = [];
  for (let i = 0; i < maxLength; i++) {
    const patchObj = diff(oldVNodeChildrens[i], newVNodeChildrens[i]);
    if (!isUndefined(patchObj)) {
      patches.push(patchObj);
    }
  }
  return patches;
}

export function diff(oldVNode: VNode, newVNode: VNode): PatchObject {
  if (isUndefined(oldVNode)) {
    return {
      type: NodePatchTypes.CREATE,
      vnode: newVNode,
    };
  }
  if (isUndefined(newVNode)) {
    return {
      type: NodePatchTypes.REMOVE,
      vnode: newVNode,
    };
  }
  if (!isSameVNode(oldVNode, newVNode)) {
    return {
      type: NodePatchTypes.REPLACE,
      vnode: newVNode,
    };
  }
  const oldVNodeElement = oldVNode as VNodeElement;
  const newVNodeElement = newVNode as VNodeElement;
  if (oldVNodeElement.tagName && newVNodeElement.tagName) {
    const result: PatchObject = {
      type: NodePatchTypes.UPDATE,
      vnode: newVNode,
    };
    const props = diffProps(oldVNodeElement, newVNodeElement);
    const children = diffChildrens(oldVNodeElement.children, newVNodeElement.children);
    if (props.length === 0 && children.length === 0 && oldVNodeElement.tagName === newVNodeElement.tagName) {
      return;
    } else {
      return { ...result, props, children };
    }
  }
}
