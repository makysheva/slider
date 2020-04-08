class Observer {
  private events: Map<string, Array<(data?: any) => void>> =
    new Map<string, Array<(data?: any) => void>>();

  public add(type: string, fn: (data?: any) => void): Observer {
    if (!this.events.has(type)) {
      this.events.set(type, []);
    }

    const event = this.events.get(type);
    // eslint-disable-next-line no-unused-expressions
    event?.push(fn);

    return this;
  }

  public emit(type: string, data?: any) {
    if (this.events.has(type)) {
      const event = this.events.get(type);
      // eslint-disable-next-line no-unused-expressions
      event?.forEach((fn) => {
        fn(data);
      });
    }
  }
}

export default Observer;
