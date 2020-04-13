import Observer from '../../Observer/Observer';

export interface IDragData { key: string, x: number, y: number }
export type DragListener = (data: IDragData) => void;

class Drag extends Observer {
  private element: HTMLElement;

  private data = { key: '', x: 0, y: 0 };

  constructor(element: HTMLElement, key: string) {
    super();
    this.element = element;
    this.data.key = key;

    this.init();
  }

  private init() {
    this.element.addEventListener('mousedown', this.handleSliderMouseDown);
  }

  private handleSliderMouseDown = () => {
    document.addEventListener('mousemove', this.handleDocumentMouseMove);
    document.addEventListener('mouseup', this.handleDocumentMouseUp);
    document.addEventListener('dragend', this.handleDocumentMouseUp);
  }

  private handleDocumentMouseUp = () => {
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    document.removeEventListener('dragend', this.handleDocumentMouseUp);
  }

  private handleDocumentMouseMove = (e: MouseEvent) => {
    this.data.x = e.clientX;
    this.data.y = e.clientY;
    this.emit('drag', this.data);
  }
}

export default Drag;
