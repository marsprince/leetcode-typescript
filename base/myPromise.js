function MyPromise(executor) {
  const self = this;
  self.status = 'pending'; // Promise当前的状态
  self.value = undefined;  // Promise的值
  self.onFulfilledCallback = []; // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  self.onRejectedCallback = []; // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

  function resolve(value) {
    if (self.status === MyPromise.PENDING) {
      setTimeout(() => {
        self.status = MyPromise.FULFILLED;
        self.value = value;
        for (let i = 0; i < self.onFulfilledCallback.length; i++) {
          self.onFulfilledCallback[i](value);
        }
      });
    }
  }

  function reject(reason) {
    if (self.status === MyPromise.PENDING) {
      setTimeout(() => {
        self.status = MyPromise.REJECTED;
        self.value = reason;
        for (let i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason);
        }
      });
    }
  }

  try { // 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
    executor(resolve, reject); // 执行executor
  } catch (e) {
    reject(e);
  }
}

// status
MyPromise.PENDING = 'pending';
MyPromise.FULFILLED = 'fulfilled';
MyPromise.REJECTED = 'rejected';

MyPromise.prototype.then = function(fulfilled, rejected) {
  const that = this;
  const onFulfilled = typeof fulfilled === 'function' ? fulfilled : value => value;
  const onRejected = typeof rejected === 'function' ? rejected : reason => {
    throw reason;
  };
  if (this.status === MyPromise.FULFILLED) {
    const promiseNew = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = onFulfilled(this.value);
          MyPromise.resolvePromise(promiseNew, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
    return promiseNew;
  }
  if (this.status === MyPromise.REJECTED) {
    const promiseNew = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = onRejected(this.value);
          MyPromise.resolvePromise(promiseNew, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
    return promiseNew;
  }
  if (this.status === MyPromise.PENDING) {
    const promiseNew = new MyPromise((resolve, reject) => {
      that.onFulfilledCallback.push((value) => {
        try {
          const result = onFulfilled(value);
          MyPromise.resolvePromise(promiseNew, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });

      that.onRejectedCallback.push((reason) => {
        try {
          const result = onRejected(reason);
          MyPromise.resolvePromise(promiseNew, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
    return promiseNew;
  }
};

MyPromise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === MyPromise) {
    return value;
  }
  return new MyPromise(function(resolve) {
    resolve(value);
  });
};

MyPromise.reject = function(value) {
  if (value && typeof value === 'object' && value.constructor === MyPromise) {
    return value;
  }
  return new MyPromise(function(resolve, reject) {
    reject(value);
  });
};

MyPromise.resolvePromise = function(promiseNew, promiseResult, resolve, reject) {
  let called = false;
  /**
   * 2.3.1 If promise and x refer to the same object, reject promise with a TypeError as the reason.
   */
  if (promiseNew === promiseResult) {
    return reject(new TypeError('cannot return the same promise object from onfulfilled or on rejected callback.'));
  }

  if (MyPromise.isMyPromise(promiseResult)) {
    if (promiseResult.status === MyPromise.PENDING) {
      /**
       * 2.3.2.1 If x is pending, promise must remain pending until x is fulfilled or rejected.
       */
      promiseResult.then(y => {
        MyPromise.resolvePromise(promiseNew, y, resolve, reject);
      }, reason => {
        reject(reason);
      });
    } else {
      /**
       * 2.3 If x is a thenable, it attempts to make promise adopt the state of x,
       * under the assumption that x behaves at least somewhat like a promise.
       *
       * 2.3.2 If x is a promise, adopt its state [3.4]:
       * 2.3.2.2 If/when x is fulfilled, fulfill promise with the same value.
       * 2.3.2.4 If/when x is rejected, reject promise with the same reason.
       */
      promiseResult.then(resolve, reject);
    }
    /**
     * 2.3.3 Otherwise, if x is an object or function,
     */
  } else if (promiseResult && (typeof promiseResult === 'object' || typeof promiseResult === 'function')) {
    /**
     * 2.3.3.1 Let then be x.then.
     * 2.3.3.2 If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
     */
    try {
      // then 方法可能设置了访问限制（setter），因此这里进行了错误捕获处理
      const then = promiseResult.then;
      if (typeof then === 'function') {

        /**
         * 2.3.3.2 If retrieving the property x.then results in a thrown exception e,
         * reject promise with e as the reason.
         */

        /**
         * 2.3.3.3.1 If/when resolvePromise is called with a value y, run [[Resolve]](promise, y).
         * 2.3.3.3.2 If/when rejectPromise is called with a reason r, reject promise with r.
         */

        then.call(promiseResult, y => {
          /**
           * If both resolvePromise and rejectPromise are called,
           * or multiple calls to the same argument are made,
           * the first call takes precedence, and any further calls are ignored.
           */
          if (called) return;
          called = true;
          MyPromise.resolvePromise(promiseNew, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r);
        });
      } else {
        resolve(promiseResult);
      }
    } catch (e) {
      /**
       * 2.3.3.3.4 If calling then throws an exception e,
       * 2.3.3.3.4.1 If resolvePromise or rejectPromise have been called, ignore it.
       * 2.3.3.3.4.2 Otherwise, reject promise with e as the reason.
       */

      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // If x is not an object or function, fulfill promise with x.
    resolve(promiseResult);
  }
};

MyPromise.isMyPromise = function(obj) {
  return obj instanceof MyPromise;
};

// for test
MyPromise.deferred = function() {
  const defer = {};
  defer.promise = new MyPromise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

MyPromise.resolved = MyPromise.resolve;
MyPromise.rejected = MyPromise.reject;

module.exports = MyPromise;
