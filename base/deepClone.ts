function isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

function isArray(x) {
  return Array.isArray(x);
}

function createData(deep, breadth) {
  const data = {};
  let temp: any = data;

  for (let i = 0; i < deep; i++) {
    temp = temp.data = {};
    for (let j = 0; j < breadth; j++) {
      temp[j] = j;
    }
  }

  return data;
}

// 递归
export const deepCloneRecursion = (source: object) => {
  if (typeof source !== 'object') return source;
  const target = isArray(source) ? [] : {};
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const value = source[key];
      target[key] = typeof value === 'object' ? deepCloneRecursion(value) : value;
    }
  }
  return target;
};

// JSON
export const deepCloneJSON = (source) => {
  return JSON.parse(JSON.stringify(source));
};

// 循环，类似于深度遍历二叉树
// 原型
// proxy
export const deepCloneCircle = (source: object, isForce?: boolean, excludes?: any[]) => {
  if (typeof source !== 'object') return source;
  // 最后的返回，初始化
  const target: any = isArray(source) ? [] : {};
  // 破解循环引用
  const uniqueList = [];
  const stack = [{
    target,
    key: '',
    node: source,
  }];
  while (stack.length) {
    const nodeObj = stack.pop();
    // 要遍历的节点
    const { node, key } = nodeObj;
    // 要保存的对象位置
    const _target = key ? nodeObj.target[key] : nodeObj.target;
    if (isForce) {
      // 判断数据是否已存在
      const existNode = uniqueList.find((value) => {
        return value.node === node;
      });
      if (existNode) {
        nodeObj.target[key] = existNode.target;
        continue; // 中断本次循环
      } else if (typeof node === 'object') {
        uniqueList.push({
          node,
          target: _target,
        });
      }
    }
    Object.keys(node).forEach(k => {
      if (excludes && excludes.includes(k)) {
        return;
      }
      _target[k] = isArray(node[k]) ? [] : {};
      if (isObject(node[k]) || isArray(node[k])) {
        // 下一次循环
        stack.push({
          target: _target,
          key: k,
          node: node[k],
        });
      } else {
        _target[k] = node[k];
      }
    });
  }
  return target;
};

// 保持引用关系, 破解循环引用
export const deepCloneForce = (source: object, excludes?: any[]) => {
  return deepCloneCircle(source, true, excludes);
};

const test = [{ m: 1 }, 2, 3];
const sourceObject: any = {
  a: test,
  e: test,
  b: {
    x: 1,
    y: 2,
  },
  c: 3,
};
sourceObject.d = sourceObject;
const deepClone: any = deepCloneForce(sourceObject, ['c']);

// deepClone.a[0] = { m: 2 };
// deepClone.b = [1];

console.log(deepClone);
console.log(deepClone.a === deepClone.e);
