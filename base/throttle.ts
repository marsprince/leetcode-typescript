// 节流 也是化高频为低频，不过是固定一段时间后执行，类比水滴
import { $Function } from '../type';

export function throttle(fn: $Function, delay) {
  let timeOutId;
  let isFirst = true;
  return (...args) => {
    if (isFirst) {
      fn.apply(this, args);
      isFirst = false;
    }
    if (!timeOutId) {
      timeOutId = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}