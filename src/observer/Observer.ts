import Event from './Event';

class Observer {
  private events: Event[] = [];

  add(type: string, fn: Function): Observer {
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

  remove(type: string, fn: Function) {
    const event: Event = this.getEvent(type) || new Event('');
    if (event.getType() !== '') {
      event.remove(fn);
    }
  }

  emit(type: string, data: Object) {
    const event: Event = this.getEvent(type) || new Event('');
    event.emit(data);
  }

  private getEvent(type: string): Event | null {
    for (let i: number = 0; i < this.events.length; i++) {
      if (this.events[i].getType() === type) {
        return this.events[i];
      }
    }
    return null;
  }
}

export default Observer;
