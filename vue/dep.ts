class Dep {
  private subscribers;

  constructor() {
    this.subscribers = [];
  }

  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

let data = {
  price: 5,
  quantity: 2,
  total: 0,
};
Object.keys(data).forEach(key => {
  let interValue = data[key];
  const dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      dep.depend();
      return interValue;
    },
    set(newVal) {
      interValue = newVal;
      dep.notify();
    },
  });
});

let target = null;

function watcher(myFunc) {
  target = myFunc;
  target();
  target = null;
}

watcher(() => {
  data.total = data.price * data.quantity;
});

data.price = 20;
