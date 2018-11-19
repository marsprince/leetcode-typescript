// 已知数据结构users，请实现语法支持user.unique能够按照name字段去重，并输出结构为：["a","b"] => [{},{}]
// 上面是保留的第一个，最后一个不会插入
// 如果想保留最后个？
interface Array<T> {
  unique(props?: string, chooseLast?: boolean): string[];
}

// es6
// Array.prototype.unique = function(props?: string): any[] {
//   const result: any[] = this.reduce((total, currentValue, currentIndex, arr) => {
//     total.push(currentValue[props] || currentValue);
//     return total;
//   }, []);
//   return Array.from(new Set(result));
// };

// es5
Array.prototype.unique = function(props?: string, chooseLast = false): any[] {
  const resultArr = [];
  const res = this.reduce((total, currentValue, currentIndex, arr) => {
    const element = currentValue[props] || currentValue;
    if (chooseLast) {
      if (typeof total[element] === 'undefined') {
        total[element] = {};
        const newLength = total.length + 1;
        total[element][total.length] = currentValue;
        total.length = newLength;
      } else {
        const key = Object.keys(total[element])[0];
        total[element][key] = currentValue;
      }
    } else {
      if (typeof total[element] === 'undefined') {
        total[element] = 1;
        resultArr.push(currentValue);
      }
    }
    return total;
  }, {
    length: 0,
  });
  if (chooseLast) {
    for (const k in res) {
      if (k !== 'length') {
        const value = res[k];
        const index = Object.keys(value)[0];
        res[index] = value[index];
      }
    }
  }
  return chooseLast ? Array.from(res) : resultArr;
};

const users = [{
  id: 1, name: 'a',
}, {
  id: 2, name: 'a',
}, {
  id: 3, name: 'b',
}, {
  id: 4, name: 'v',
}];

console.log(users.unique('name', true));