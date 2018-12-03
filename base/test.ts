const test = [1, 2, 3, 4, 5];

for (let i = 0; i < 5; i++) {
  if (test[i] > 2) {
    test.splice(i, 1);
  }
}

console.log(test);