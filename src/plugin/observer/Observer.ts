import Event from './Event';

class Observer {
  private events: Event[] = [];

  // tslint:disable-next-line:ban-types
  public add(type: string, fn: Function): Observer {
    let event: Event = this.getEvent(type) || null!;

    if (event) {
      event.add(fn);
    } else {
      event = new Event(type);
      event.add(fn);
      this.events.push(event);
    }

    return this;
  }

  // tslint:disable-next-line:ban-types
  public remove(type: string, fn: Function) {
    const event: Event = this.getEvent(type) || new Event('');
    if (event.getType() !== '') {
      event.remove(fn);
    }
  }

  public emit(type: string, data: object) {
    const event: Event = this.getEvent(type) || new Event('');
    event.emit(data);
  }

  private getEvent(type: string): Event | null {
    for (const event of this.events) {
      if (event.getType() === type) {
        return event;
      }
    }
    return null;
  }
}

export default Observer;
