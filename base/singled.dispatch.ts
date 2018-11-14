/**
 * 单分派泛函数，解决无穷无尽的if-else
 */
interface Event {
  judgeFunc: any;
  dispatch?: any;
}

interface SD {
  [K: string]: Event;
}

export class SingledDispatch {
  private sd: SD = {};

  constructor() {

  }

  register(name: string, judgeFunc: (...args) => boolean) {
    const sd = this.sd;
    if (!sd[name]) {
      sd[name] = {
        judgeFunc,
      };
    }
    const sdName = sd[name];
    sdName.judgeFunc = judgeFunc;
    return this;
  }

  dispatch(name: string, callback: any) {
    const sd = this.sd;
    const sdName = sd[name];
    if (!sdName) {
      throw new Error('请先注册');
    }
    sdName.dispatch = callback;
    return this;
  }

  run(value: any) {
    const sd = this.sd;
    for (const name in sd) {
      if (sd.hasOwnProperty(name)) {
        const event = sd[name];
        if (event.judgeFunc(value)) {
          event.dispatch(value);
          break;
        }
      }
    }
  }
}

// 期望
const singledDispatch = new SingledDispatch();
singledDispatch.register('isNumber', (value) => typeof value === 'number').dispatch('isNumber', (value) => {
  console.log('number');
});
singledDispatch.register('isString', (value) => typeof value === 'string').dispatch('isString', (value) => {
  console.log(value);
});
singledDispatch.run('123');