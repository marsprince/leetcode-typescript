export function createCurry(func, ...args) {
  let arg = args;
  const newFunc = (...newArgs) => {
    if (newArgs.length === 0) {
      return func.apply(this, arg);
    } else {
      arg = arg.concat(...newArgs)
      return newFunc;
    }
  };
  newFunc.toString = newFunc.valueOf = () => {
    return func.apply(this, arg);
  }
  return newFunc;
}

function add(...args) {
  return [].reduce.call(args, (a, b) => {
    return a + b;
  }, 0);
}

console.log(createCurry(add)(1)(2)(3) === 6);