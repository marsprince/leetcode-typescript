import { $Function } from '../type';

function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

export function newFn(constructor: $Function, ...args: any[]) {
  const newObj = Object.create(constructor.prototype);
  const result = constructor.apply(newObj, args);
  return (typeof result === 'object' && result !== null) || typeof result === 'function' ? result : newObj;
}

function test(name) {
  this.x = name;
}

console.log(newFn(test, 222));