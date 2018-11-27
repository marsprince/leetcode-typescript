import { DOMNode } from './types';
import { NodePatchTypes, NodePropsTypes, PatchObject, PatchVNodeProps } from './types/patch';
import { isTextNode, isUndefined, createEmptyNode } from './util';
import { createElement } from './create.vnode';

function patchProps(domNode: Node, patchPropList: PatchVNodeProps[]) {
  patchPropList.forEach(patchProp => {
    switch (patchProp.type) {
      case NodePropsTypes.UPDATE:
        (domNode as HTMLElement).setAttribute(patchProp.key, patchProp.value.toString());
        break;
      case NodePropsTypes.REMOVE:
        (domNode as HTMLElement).removeAttribute(patchProp.key);
        break;
    }
  });
}

function patchChildrens(domNode: Node, patchChildren?: PatchObject[]) {
  patchChildren.forEach(child => {
    _patch(domNode, child, child.childIndex);
  });
}

function updatePatch(domNode: Node, patchObj?: PatchObject): void {
  if (patchObj.props.length !== 0) {
    patchProps(domNode, patchObj.props);
  }

  if (patchObj.children.length !== 0) {
    patchChildrens(domNode, patchObj.children);
  }
}

function _patch(parentNode: DOMNode, patchObj?: PatchObject, index = 0) {
  const element = parentNode.childNodes[index];

  if (isUndefined(element)) {
    parentNode.appendChild(createElement(patchObj.vnode));
    return;
  }
  if (isTextNode(element)) {
    parentNode.replaceChild(createElement(patchObj.vnode), element);
    return;
  }

  switch (patchObj.type) {
    case NodePatchTypes.CREATE:
      parentNode.appendChild(createElement(patchObj.vnode));
      break;
    case NodePatchTypes.REPLACE:
      parentNode.replaceChild(createElement(patchObj.vnode), element);
      break;
    case NodePatchTypes.REMOVE:
      parentNode.removeChild(element);
      break;
    case NodePatchTypes.UPDATE:
      updatePatch(element, patchObj);
  }
}

export function patch(domNode: DOMNode, patchObj?: PatchObject, index = 0): DOMNode {
  if (isUndefined(patchObj)) {
    return;
  }

  let virtualParent;

  if (!(domNode as HTMLElement).parentNode) {
    virtualParent = createEmptyNode();
    virtualParent.appendChild(domNode);
  }

  const parentNode = domNode.parentNode;

  _patch(parentNode, patchObj, index);

  if (virtualParent) {
    const newDomNode = parentNode.childNodes[0] as HTMLElement;
    virtualParent.removeChild(newDomNode);
    return newDomNode;
  }

  return domNode;
}