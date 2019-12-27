import { Event } from "./Event";

class Observer {
    private _events: Event[] = [];

    add(type: string, fn: Function): Observer {
        let event: Event = this.getEvent(type) || null!;

        if (event) {
            event.add(fn);
        } else {
            event = new Event(type);
            event.add(fn);
            this._events.push(event);
        }
        
        return this;
    }

    remove(type: string, fn: Function) {
        let event: Event = this.getEvent(type) || new Event('');
        if (event.type != '') {
            event.remove(fn);
        }
    }

    emmit(type: string, data: Object) {
        let event: Event = this.getEvent(type) || new Event('');
        event.emmit(data);
    }

    private getEvent(type: string): Event | null {
        for (let i: number = 0; i < this._events.length; i++) {
            if (this._events[i].type == type) {
                return this._events[i];
            }
        }
        return null;
    }
}

export { Observer };