// 只用一个数组，保存一个对象
function MpPromise(fn) {
  if (!(this instanceof MpPromise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = MpPromise.PENDING;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];
  this._test = undefined;

  doResolve(fn, this);
}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function doResolve(fn, self) {
  try {
    fn(
      function(value) {
        if (self._state === MpPromise.PENDING) {
          resolve(self, value);
        }
      },
      function(reason) {
        if (self._state === MpPromise.PENDING) {
          reject(self, reason);
        }
      },
    );
  } catch (ex) {
    if (self._state === MpPromise.PENDING) {
      self._state = MpPromise.REJECTED;
      reject(self, ex);
    }
  }
}

function resolve(self, newValue) {
  try {
    if (MpPromise.resolvePromise(self,newValue)) {
      self._state = MpPromise.FULFILLED;
      self._value = newValue;
      finale(self);
    }
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = MpPromise.REJECTED;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  for (let i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

function handle(self, deferred) {
  while (self._test === 3) {
    self = self._value;
  }
  if (self._state === MpPromise.PENDING) {
    self._deferreds.push(deferred);
    return;
  }
  MpPromise._immediateFn(function() {
    const cb = self._state === MpPromise.FULFILLED ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === MpPromise.FULFILLED ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    let ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

// status
MpPromise.PENDING = 'pending';
MpPromise.FULFILLED = 'fulfilled';
MpPromise.REJECTED = 'rejected';
MpPromise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === MpPromise) {
    return value;
  }

  return new MpPromise(function(resolve) {
    resolve(value);
  });
};
MpPromise.reject = function(value) {
  return new MpPromise(function(resolve, reject) {
    reject(value);
  });
};
// Use polyfill for setImmediate for performance gains
MpPromise._immediateFn = function(fn) {
  return typeof setImmediate === 'function' ? setImmediate(fn) : setTimeout(fn, 0);
};

MpPromise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  const prom = new this.constructor(function() {
  });

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

MpPromise.resolvePromise = function(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self)
    throw new TypeError('A promise cannot be resolved with itself.');
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    const then = newValue.then;
    if (newValue instanceof MpPromise) {
      self._test = 3;
      self._value = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  return true
};

// for test
MpPromise.deferred = function() {
  const defer = {};
  defer.promise = new MpPromise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

MpPromise.resolved = MpPromise.resolve;
MpPromise.rejected = MpPromise.reject;

module.exports = MpPromise;