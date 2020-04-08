import Observer from '../../Observer/Observer';

export interface IDragData { key: string, x: number, y: number }
export type DragListener = (data: IDragData) => void;

class Drag extends Observer {
  private element: HTMLElement;

  private isMouseDown: boolean = false;

  private data = { key: '', x: 0, y: 0 };

  constructor(element: HTMLElement, key: string) {
    super();
    this.element = element;
    this.data.key = key;

    this.init();
  }

  public getPosition(): { x: number, y: number } {
    return this.getData();
  }

  public getDragData(): IDragData {
    return this.data;
  }

  protected getData() {
    return this.data;
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
    if (this.isMouseDown) {
      this.data.x = e.clientX;
      this.data.y = e.clientY;
      this.emit('drag', this.data);
    }
  }
}

export default Drag;
