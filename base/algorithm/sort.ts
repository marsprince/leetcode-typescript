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

