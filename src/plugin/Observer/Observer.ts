class Observer {
  private events: Map<string, Array<() => void>> =
    new Map<string, Array<() => void>>();

  public add(type: string, fn: () => void): Observer {
    if (!this.events.has(type)) {
      this.events.set(type, []);
    }

    const event = this.events.get(type);
    // eslint-disable-next-line no-unused-expressions
    event?.push(fn);

    return this;
  }

  public emit(type: string) {
    if (this.events.has(type)) {
      const event = this.events.get(type);
      // eslint-disable-next-line no-unused-expressions
      event?.forEach((fn) => {
        fn();
      });
    }
  }
}

export default Observer;
