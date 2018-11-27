import { VNode, VNodeElement } from './types';

export function isUndefined(val: any): boolean {
  return typeof val === 'undefined';
}

export function isString(val: any): boolean {
  return typeof val === 'string';
}

export function isNumber(val: any): boolean {
  return typeof val === 'number';
}

export function isSameVNode(oldVNode: VNode, newVNode: VNode): boolean {
  if (typeof oldVNode === typeof newVNode) {
    if (isNumber(oldVNode) || isString(oldVNode)) {
      return oldVNode === newVNode;
    } else {
      return (oldVNode as VNodeElement).tagName === (newVNode as VNodeElement).tagName;
    }
  } else {
    return false;
  }
}