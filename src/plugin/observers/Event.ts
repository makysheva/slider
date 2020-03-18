class Event {
  private type: string;

  private subscribers: Function[] = [];

  constructor(type: string) {
    this.type = type;
  }

  public add(fn: Function): boolean {
    if (!this.subscribers.includes(fn)) {
      this.subscribers.push(fn);
      return true;
    }

    return false;
  }

  public remove(fn: Function) {
    this.subscribers = this.subscribers.filter((value) => value !== fn);
  }

  public emit(data: object) {
    this.subscribers.forEach((value) => value(this.type, data));
  }

  public getType(): string {
    return this.type;
  }
}

export default Event;
