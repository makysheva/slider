class Event {
  private type: string;

  private subscribers: Function[] = [];

  constructor(type: string) {
    this.type = type;
  }

  add(fn: Function) {
    if (!this.subscribers.includes(fn)) {
      this.subscribers.push(fn);
    }
  }

  remove(fn: Function) {
    this.subscribers = this.subscribers.filter((value) => value !== fn);
  }

  emit(data: Object) {
    this.subscribers.forEach((value) => value(this.type, data));
  }

  getType(): string {
    return this.type;
  }
}

export default Event;
