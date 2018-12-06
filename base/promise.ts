import { $Function } from '../type';

type promiseConstructorFunc = (resolve: any, reject?: any) => any;

export class Promise {
  private resolves: $Function[] = [];
  private rejects: $Function[] = [];
  private state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
  private value: any;

  constructor(func: promiseConstructorFunc) {
    func(this.resolve.bind(this), this.reject.bind(this));
  }

  // Promise.resolve 返回一个fulfilled状态的promise对象
  static resolve(value?: any) {
    return new Promise(resolve => {
      resolve(value);
    });
  }

  // 2.Promise.reject 返回一个rejected状态的promise对象
  static reject(value?: any) {
    return new Promise((resolve, reject) => {
      reject(value);
    });
  }

  // 3.Promise.all 接收一个promise对象数组为参数
  static all(promiseArr: Promise[]) {
    return new Promise((resolve, reject) => {
      let len = promiseArr.length;
      const values = [];
      promiseArr.forEach((promise: Promise, index) => {
        promise.then((value) => {
          len--;
          values[index] = value;
          if (len === 0) {
            resolve(values);
          }
        }, (value) => {
          reject(value);
        });
      });
    });
  }

  // 4.Promise.race 接收一个promise对象数组为参数
  static race(promiseArr: Promise[]) {
    return new Promise((resolve, reject) => {
      promiseArr.forEach((promise: Promise) => {
        promise.then((value) => {
          resolve(value);
        }, (value) => {
          reject(value);
        });
      });
    });
  }

  private reject(value?: any) {
    this.value = value;
    this.state = 'rejected';
    setTimeout(() => {
      this.rejects.forEach((callback) => {
        callback && callback(value);
      });
    }, 0);
  }

  private resolve(value?: any) {
    this.value = value;
    if (this.state === 'fulfilled' || this.state === 'rejected') {
      return;
    }
    this.state = 'fulfilled';
    setTimeout(() => {
      let _value = value;
      this.resolves.forEach((callback) => {
        if (callback) {
          let temp;
          // 如果上一个结果是promise
          if (_value instanceof Promise) {
            temp = _value.then(callback);
          } else {
            temp = callback(_value);
          }
          // 缓存上一个结果
          if (typeof temp !== 'undefined') {
            _value = temp;
          }
        }
      });
    }, 0);
  }

  then(onFulfilled: $Function, onRejected?: $Function) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    }
    this.resolves.push(onFulfilled);
    this.rejects.push(onRejected);
    return this;
  }

  catch(onRejected: $Function) {
    return this.then(null, onRejected);
  }

  finally(onFinal: $Function) {
    return this.then(() => {
      onFinal(this.value);
    }, () => {
      onFinal(this.value);
    });
  }
}

const x = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

const y = (id) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(id + 1000);
    }, 100);
  });
};
x.then(y).then((data) => {
  console.log(data);
})
// Promise.resolve('hello').finally(function(value) {
//   console.log(value);
// });