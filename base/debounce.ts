// 防抖，讲多次高频操作化为最后一次执行
// 例：input输入
import { $Function } from '../type';

/**
 * @param fn
 * @param wait N秒无操作后执行
 */
export function debounce(fn: $Function, wait: number) {
  let timeOutId;
  return (...args) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}