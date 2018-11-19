import testVueData from './test.vue.data';
const test = {
  data: {
    a: 1,
  },
}

class VueData {
  private opt: any;
  public data: any;

  constructor(opt) {
    this.opt = opt;
    this.data = this.opt.data;
  }

  update() {
    this.data.a++;
  }

  notify() {
    console.log(this.opt);
  }
}

let c = new VueData({
  data: {
    a: 1,
  },
});
let d = new VueData({
  data: {
    a: 1,
  },
});

console.log(c.data === d.data);
