import Track from './Track';
import Orientation from '../types/Orientation';
import '../scss/slider.scss';
import Fill from './Fill';
import Pointer from './Pointer';
import Controller from '../controller/Controller';
import SliderData from '../types/SliderData';

class Slider {
  private controller: Controller;

  private container: HTMLElement;

  private track: Track;

  private fill: Fill;

  private pointers: Map<string, Pointer> = new Map<string, Pointer>();

  private orientation: Orientation;

  constructor(container: HTMLElement, controller: Controller) {
    this.orientation = Orientation.Vertical;
    this.controller = controller;

    this.container = container;
    this.track = new Track(this.container);
    this.track.update(this.orientation);

    this.fill = new Fill(this.track.getElement());
    this.fill.update(0, 0, this.orientation);

    this.createPointer('low');

    this.container.addEventListener('click', this.onClick.bind(this));
  }

  private onClick(event: MouseEvent) {
    const target: HTMLElement = (event.target as HTMLElement);
    if (Slider.isTrack(target)) {
      const position: number = this.track.getRelativePosition(event.clientX, event.clientY);
      this.controller.setPosition(position);
    }
  }

  private onDrag(key: string, pos: number) {
    const position: number = this.track.getRelativePosition(pos, pos);
    console.log(`pos: ${position}`);
    const id: number = (key === 'low') ? 0 : 1;
    this.controller.setPointPosition(position, id);
  }

  private static isTrack(element: HTMLElement) {
    return element.classList.contains('slider__fill') || element.classList.contains('slider__track');
  }

  public update(data: SliderData) {
    this.track.update(data.orientation);

    let lowPos: number;
    let hightPos: number;

    if (data.isRange) {
      lowPos = (data.lowPointer.position) * 100;
      hightPos = (1 - data.hightPointer.position) * 100;
      this.createPointer('hight');
      const pointer: Pointer | undefined = this.pointers.get('hight');
      if (pointer) {
        pointer.update(this.track.getAbsolutePosition(data.hightPointer.position), data.orientation);
      }
    } else {
      lowPos = 0;
      hightPos = (1 - data.lowPointer.position) * 100;
      this.destroyPointer('hight');
    }

    this.fill.update(lowPos, hightPos, data.orientation);
    const pointer: Pointer | undefined = this.pointers.get('low');
    if (pointer) {
      pointer.update(this.track.getAbsolutePosition(data.lowPointer.position), data.orientation);
    }
  }

  private createPointer(key: string) {
    if (this.pointers.has(key)) {
      return;
    }

    const pointer: Pointer = new Pointer(this.track.getElement(), key);
    this.pointers.set(key, pointer);
    pointer.update(0, this.orientation);
    pointer.setDragListener(this.onDrag.bind(this));
  }

  private destroyPointer(key: string) {
    if (this.pointers.has(key)) {
      const pointer: Pointer | undefined = this.pointers.get(key);
      if (pointer) {
        pointer.destroy();
      }

      this.pointers.delete(key);
    }
  }
}

export default Slider;
