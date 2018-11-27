import { DOMNode } from './types';
import { PatchObject } from './types/patch';

export function patch(domNode: DOMNode, patch?: PatchObject): DOMNode {
  if (typeof patch === 'undefined') {
    return;
  }
}