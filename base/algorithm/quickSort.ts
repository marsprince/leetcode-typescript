// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/quick-sort

import { lessThan, equal } from './sort';

// 非原地, 占用额外的空间
// 时间复杂度：
// 最坏: 倒序 (n-1)(n)/2
// 最好: ?
export function quickSort(originalArray) {
  // Clone original array to prevent it from modification.
  const array = [...originalArray];

  // If array has less than or equal to one elements then it is already sorted.
  if (array.length <= 1) {
    return array;
  }

  // Init left and right arrays.
  const leftArray = [];
  const rightArray = [];

  // Take the first element of array as a pivot.
  const pivotElement = array.shift();
  const centerArray = [pivotElement];

  // Split all array elements between left, center and right arrays.
  while (array.length) {
    const currentElement = array.shift();
    if (equal(currentElement, pivotElement)) {
      centerArray.push(currentElement);
    } else if (lessThan(currentElement, pivotElement)) {
      leftArray.push(currentElement);
    } else {
      rightArray.push(currentElement);
    }
  }

  // Sort left and right arrays.
  const leftArraySorted = quickSort(leftArray);
  const rightArraySorted = quickSort(rightArray);

  // Let's now join sorted left array with center array and with sorted right array.
  return leftArraySorted.concat(centerArray, rightArraySorted);
}

// 原地，需要传索引确定范围
/**
 * @param originalArray 快排的数组
 * @param inputLowIndex 低索引
 * @param inputHighIndex 高索引
 * @param recursiveCall 是复制一个新数组还是在输入数组上改
 */
export function quickSortInPlace(
  originalArray,
  inputLowIndex = 0,
  inputHighIndex = originalArray.length - 1,
  recursiveCall = false,
) {
  // Copies array on initial call, and then sorts in place.
  const array = recursiveCall ? originalArray : [...originalArray];

  /**
   * The partitionArray() operates on the subarray between lowIndex and highIndex, inclusive.
   * It arbitrarily chooses the last element in the subarray as the pivot.
   * Then, it partially sorts the subarray into elements than are less than the pivot,
   * and elements that are greater than or equal to the pivot.
   * Each time partitionArray() is executed, the pivot element is in its final sorted position.
   *
   * @param {number} lowIndex
   * @param {number} highIndex
   * @return {number}
   */
  const partitionArray = (lowIndex, highIndex) => {
    /**
     * Swaps two elements in array.
     * @param {number} leftIndex
     * @param {number} rightIndex
     */
    const swap = (leftIndex, rightIndex) => {
      const temp = array[leftIndex];
      array[leftIndex] = array[rightIndex];
      array[rightIndex] = temp;
    };

    const pivot = array[highIndex];

    let partitionIndex = lowIndex;
    for (let currentIndex = lowIndex; currentIndex < highIndex; currentIndex += 1) {
      if (this.comparator.lessThan(array[currentIndex], pivot)) {
        swap(partitionIndex, currentIndex);
        partitionIndex += 1;
      }
    }

    // The element at the partitionIndex is guaranteed to be greater than or equal to pivot.
    // All elements to the left of partitionIndex are guaranteed to be less than pivot.
    // Swapping the pivot with the partitionIndex therefore places the pivot in its
    // final sorted position.
    swap(partitionIndex, highIndex);

    return partitionIndex;
  };

  // Base case is when low and high converge.
  if (inputLowIndex < inputHighIndex) {
    const partitionIndex = partitionArray(inputLowIndex, inputHighIndex);
    const RECURSIVE_CALL = true;
    quickSortInPlace(array, inputLowIndex, partitionIndex - 1, RECURSIVE_CALL);
    quickSortInPlace(array, partitionIndex + 1, inputHighIndex, RECURSIVE_CALL);
  }

  return array;
}