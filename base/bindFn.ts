import { newFn } from './newFn';

Function.prototype.bindFn = function(bindToThis, ...arg: any[]) {
  if (typeof this !== 'function') {
    return;
  }
  const argsBind = Array.from(arg);
  const self = this;
  const bindReturn = function(..._arguments: any[]) {
    const args = Array.from(_arguments);
    if (this instanceof bindReturn) {
      return newFn(self, ...argsBind.concat(args));
    } else {
      return self.apply(bindToThis, argsBind.concat(args));
    }
  };
  return bindReturn;
};

// 测试
const obj = {
  name: '轩辕Rowboat',
};

function original(a, b) {
  console.log(this.name);
  console.log([a, b]);
}

const bound = original.bindFn(obj, 1);
new bound(2); // '轩辕Rowboat', [1, 2]
