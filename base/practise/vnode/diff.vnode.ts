import { VNode, VNodeElement, DiffWithoutKey } from './types/index';
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
          key,
          value: newValue,
        });
      }
    } else {
      total.push({
        type: NodePropsTypes.REMOVE,
        key,
      });
    }
    return total;
  }, result);
}

function diffChildrensWithoutKey(oldVNodeChildrens: DiffWithoutKey[], newVNodeChildrens: DiffWithoutKey[]): PatchObject[] {
  const maxLength = Math.max(oldVNodeChildrens.length, newVNodeChildrens.length);
  const patches = [];
  for (let i = 0; i < maxLength; i++) {
    const patchObj = diff(
      oldVNodeChildrens[i] ? oldVNodeChildrens[i].vnode : undefined,
      newVNodeChildrens[i] ? newVNodeChildrens[i].vnode : undefined);
    if (!isUndefined(patchObj)) {
      patchObj.childIndex = Math.max(
        oldVNodeChildrens[i] ? oldVNodeChildrens[i].index : 0,
        newVNodeChildrens[i] ? newVNodeChildrens[i].index : 0);
      patches.push(patchObj);
    }
  }
  return patches;
}

function diffChildrensWithKey(oldVNodeChildrensWithKey: any, newVNodeChildrensWithKey: any): PatchObject[] {
  const patches = [];
  const oldKeys = Object.keys(oldVNodeChildrensWithKey);
  const newKeys = Object.keys(newVNodeChildrensWithKey);
  let oldStart = 0;
  let oldEnd = oldKeys.length - 1;
  let newStart = 0;
  let newEnd = newKeys.length - 1;
  while (newStart <= newEnd && oldStart <= oldEnd) {
    const oldStartKey = oldKeys[oldStart];
    const oldEndKey = oldKeys[oldEnd];
    const newStartKey = newKeys[newStart];
    const newEndKey = newKeys[newEnd];

    const oldStartNode = oldVNodeChildrensWithKey[oldStartKey];
    const oldEndNode = oldVNodeChildrensWithKey[oldEndKey];
    const newStartNode = newVNodeChildrensWithKey[newStartKey];
    const newEndNode = newVNodeChildrensWithKey[newEndKey];
    // 如果头部节点key值相同
    if (oldStartKey === newStartKey) {
      oldStart++;
      newStart++;
      patches.push(diff(oldStartNode, newStartNode));
    }
    // 如果尾部key值相同
    if (oldEndKey === newEndKey) {
      oldEnd--;
      newEnd--;
      patches.push(diff(oldEndNode, newEndNode));
    }
    // 处理头尾/尾头的同类型节点
    if (oldStartKey === newEndKey) {
      oldStart++;
      newEnd--;
    }
    if (oldEndKey === newStartKey) {
      oldEnd--;
      newStart++;
    }
    // 如果新头部不在旧节点中，则代表新增
    if (!(newStartKey in oldKeys)) {
      newStart++;
    }
    // 如果新头部在旧节点中，且位置不同
    if (newStartKey in oldKeys && newStartKey !== oldStartKey) {

    }
  }
  return patches;
}

function diffChildrens(oldVNodeChildrens: VNode[], newVNodeChildrens: VNode[]): PatchObject[] {
  const maxLength = Math.max(oldVNodeChildrens.length, newVNodeChildrens.length);
  const oldVNodeChildrensWithKey = {};
  const newVNodeChildrensWithKey = {};
  const oldVNodeChildrensWithOutKey = [];
  const newVNodeChildrensWithOutKey = [];
  // 将children分为两组，一组有key，一组没有key
  for (let i = 0; i < maxLength; i++) {
    const oldVNodeChildren = oldVNodeChildrens[i] as VNodeElement;
    const newVNodeChildren = newVNodeChildrens[i] as VNodeElement;
    if (!isUndefined(oldVNodeChildren)) {
      if (!isUndefined(oldVNodeChildren.key)) {
        const key = oldVNodeChildren.key;
        oldVNodeChildrensWithKey[key] = oldVNodeChildren;
      } else {
        oldVNodeChildrensWithOutKey.push({
          index: i,
          vnode: oldVNodeChildren,
        });
      }
    }
    if (!isUndefined(newVNodeChildren)) {
      if (!isUndefined(newVNodeChildren.key)) {
        const key = newVNodeChildren.key;
        newVNodeChildrensWithKey[key] = newVNodeChildren;
      } else {
        newVNodeChildrensWithOutKey.push({
          index: i,
          vnode: newVNodeChildren,
        });
      }
    }
  }
  const patchWithoutKey = diffChildrensWithoutKey(oldVNodeChildrensWithOutKey, newVNodeChildrensWithOutKey);
  const patchWithKey = diffChildrensWithKey(oldVNodeChildrensWithKey, newVNodeChildrensWithKey);
  return patchWithoutKey.concat(patchWithKey);
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
