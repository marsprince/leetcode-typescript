export class ArrayMap {
  public map: Map<any, number>;

  constructor() {
    this.map = new Map<any, number>();
  }

  get(key: any): number | number[] {
    return this.map.get(JSON.stringify(key));
  }

  set(key: any, value: any): void {
    this.map.set(JSON.stringify(key), value);
  }
}

// 将数组映射为等效的value: index的object
// 如果有相同的value，则返回Index列表
export const arrayToMap = (arr): ArrayMap => {
  const result = new ArrayMap();
  arr.forEach((value, index) => {
    result.set(value, index);
  });
  return result;
};

const test1 = {
  1: 'test',
};
const _arr = [
  test1,
  [{
    2: 'test',
  }],
];

const _arrToMap = arrayToMap(_arr);

console.log(_arrToMap.get(test1));