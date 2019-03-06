export function lessThan(a, b) {
  return a < b;
}

export function equal(a, b) {
  return a === b;
}

export function checkArray(originalArray) {
  return originalArray.length <= 1 ? originalArray : [...originalArray];
}

// Bubble sort, sometimes referred to as sinking sort,
// is a simple sorting algorithm that repeatedly steps through the list to be sorted,
// compares each pair of adjacent items and swaps them if they are in the wrong order (ascending or descending arrangement).
// The pass through the list is repeated until no swaps are needed,
// which indicates that the list is sorted.Bubble sort,
// sometimes referred to as sinking sort,
// is a simple sorting algorithm that repeatedly steps through the list to be sorted,
// compares each pair of adjacent items and swaps them if they are in the wrong order (ascending or descending arrangement).
// The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.

// 冒泡排序
// 每一次沉一个最大的到最后
export function BubbleSort(originalArray) {
  // Flag that holds info about whether the swap has occur or not.
  let swapped = false;
  // Clone original array to prevent its modification.
  const array = [...originalArray];

  // 最小次数n-1,最大次数是从 n-1 到 1 做和 = (n-1)n/2
  // 次数是n-1次，因为每次都会找出一个最大值
  for (let i = 1; i < array.length; i += 1) {
    swapped = false;
    // 每次的比较，因为每次最后一个都是最大值
    for (let j = 0; j < array.length - i; j += 1) {
      // Swap elements if they are in wrong order.
      if (lessThan(array[j + 1], array[j])) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        // Register the swap.
        swapped = true;
      }
    }
    // If there were no swaps then array is already sorted and there is
    // no need to proceed.
    if (!swapped) {
      return array;
    }
  }

  return array;
}

// 选择排序
// 每趟选择一个最小的，记录索引，最后交换
export function SelectionSort(originArray) {
  const arr = [...originArray];
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
  return arr;
}

// 插入排序
// 相当于向前冒泡
export function InsertionSort(originalArray) {
  const array = [...originalArray];

  // Go through all array elements...
  for (let i = 0; i < array.length; i += 1) {
    let currentIndex = i;
    // Go and check if previous elements and greater then current one.
    // If this is the case then swap that elements.
    for (let j = i - 1; j >= 0; j--) {
      if (lessThan(array[currentIndex], array[j])) {
        [array[currentIndex], array[j]] = [array[j], array[currentIndex]];
        currentIndex = j;
      } else {
        break;
      }
    }
  }

  return array;
}

console.log(InsertionSort([4, 2, 1, 5, 3]));
