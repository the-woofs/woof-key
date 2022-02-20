module.exports = class Queue {
  constructor() {
    if (process.env.QUEUE) {
      this.items = JSON.parse(process.env.QUEUE);
    } else {
      this.items = [];
      process.env.QUEUE = JSON.stringify(this.items);
    }
    if (process.env.BUSY) {
      this.busy = process.env.BUSY;
    } else {
      this.busy = false;
      process.env.BUSY = false;
    }
  }

  apply(list) {
    list = list ? list : this.items;
    process.env.QUEUE = JSON.stringify(list);
  }

  get() {
    return this.items;
  }

  add(item) {
    this.items.push(item);
    this.apply();
  }

  clear() {
    this.items = [];
    this.apply();
  }

  setBusy(value) {
    this.busy = value;
    process.env.BUSY = value;
  }

  getBusy() {
    return this.busy;
  }
};
