/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
export const twoSum = (nums: number[], target: number): number[] => {
  const obj = {};
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    const other = target - item;
    if (typeof obj[other] === 'number') {
      return [obj[other], i];
    } else {
      obj[item] = i;
    }
  }
  return [];
};
