class Event {
  private _type: string;
  private _subscribers: Function[] = [];

  constructor(type: string) {
    this._type = type;
  }

  add(fn: Function) {
    if (!this._subscribers.includes(fn)) {
      this._subscribers.push(fn);
    }
  }

  remove(fn: Function) {
    this._subscribers = this._subscribers.filter((value) => value != fn);
  }

  emmit(data: Object) {
    this._subscribers.forEach((value) => value(this._type, data));
  }

  get type(): string {
    return this._type;
  }
}

export { Event };
