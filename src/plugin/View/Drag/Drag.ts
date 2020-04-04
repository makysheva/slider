class Drag {
  private element: HTMLElement;

  private key: string;

  private onDragFn: Listener;

  private isMouseDown: boolean = false;

  constructor(element: HTMLElement, key: string) {
    this.element = element;
    this.key = key;

    this.init();
  }

  public setDragListener(onDragFn: Listener) {
    this.onDragFn = onDragFn;
  }

  private init() {
    this.element.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('dragend', this.onMouseUp);
  }

  private onMouseDown = () => {
    this.isMouseDown = true;
  }

  private onMouseUp = () => {
    this.isMouseDown = false;
  }

  private onMouseMove = (e: MouseEvent) => {
    if (this.isMouseDown && this.onDragFn) {
      this.onDragFn.call(this, this.key, e.clientX, e.clientY);
    }
  }
}

type Listener = (key: string, x: number, y: number) => void;

export default Drag;
