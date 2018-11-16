// 直接改变原数组
export const arrDelete = <T>(arr: T[], judgeFn: (...args) => boolean): T[] => {
  const _arr: T[] = [];
  arr.forEach((value => {
    if (judgeFn(value)) {
      _arr.push(value);
    }
  }));
  return _arr;
};

const _judgeFn = (value) => {
  return value % 2 === 0;
};

const arrx = [2, 4, 5, 6, 7, 8, 9];
const result = arrDelete(arrx, _judgeFn);
console.log(result);
