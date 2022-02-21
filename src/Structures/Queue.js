module.exports = class Queue {
  constructor() {
    this.items = [];
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
    if (!this) {
      return JSON.parse(process.env.QUEUE);
    }
    if (process.env.QUEUE) {
      this.items = JSON.parse(process.env.QUEUE);
    }
    return this.items;
  }

  add(item) {
    let items = this.get();
    items.push(item);
    process.env.QUEUE = JSON.stringify(items);
  }

  clear() {
    const items = [];
    process.env.QUEUE = JSON.stringify(items);
  }

  setBusy(value) {
    process.env.BUSY = value;
  }

  getBusy() {
    return process.env.BUSY;
  }
};
