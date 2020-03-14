import '../scss/slider.scss';

import Controller from '../controller/Controller';
import Fill from './Fill';
import MinMax from './minmax/MinMax';
import Orientation from '../types/Orientation';
import Pointer from './Pointer';
import SliderData from '../types/SliderData';
import Track from './Track';
import TipData from "./tips/TipData";
import TipManager from './tips/TipManager';

class Slider {
  private static isTrack(element: HTMLElement) {
    return element.classList.contains("slider__fill") || element.classList.contains('slider__track');
  }

  private controller: Controller;

  private container: HTMLElement;

  private sliderElement: HTMLElement;

  private track: Track;

  private fill: Fill;

  private pointers: Map<string, Pointer> = new Map<string, Pointer>();

  private orientation: Orientation;

  private tipManager: TipManager;

  private data: SliderData;

  private minMax: MinMax;

  constructor(container: HTMLElement, controller: Controller) {
    this.orientation = Orientation.Vertical;
    this.controller = controller;
    this.container = container;

    this.sliderElement = document.createElement('div');
    this.sliderElement.classList.add('slider');
    this.container.appendChild(this.sliderElement);

    this.track = new Track(this.sliderElement);
    this.track.update(this.orientation);

    this.fill = new Fill(this.track.getElement());
    this.fill.update(0, 0, this.orientation);

    this.createPointer('low');

    this.sliderElement.addEventListener('click', this.onClick.bind(this));

    this.tipManager = new TipManager(this.sliderElement);

    this.minMax = new MinMax(this.sliderElement, this.controller);
  }

  public update(data: SliderData) {
    this.data = data;
    this.track.update(this.data.orientation);
    this.updateFill();
    this.updatePointers();
    this.updateTip();
    this.minMax.update(this.data.min.toString(), this.data.max.toString(), this.data.orientation);
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
    const id: number = (key === 'low') ? 0 : 1;
    this.controller.setPointPosition(position, id);
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

  private updatePointers() {
    let pointer: Pointer | undefined = this.pointers.get('low');
    if (pointer) {
      const pointerPosition: number = this.track.getAbsolutePosition(this.data.lowPointer.position);
      pointer.update(pointerPosition, this.data.orientation);
    }

    if (this.data.isRange) {
      this.createPointer('hight');
      pointer = this.pointers.get('hight');
      if (pointer) {
        const pointerPosition = this.track.getAbsolutePosition(this.data.hightPointer.position);
        pointer.update(pointerPosition, this.data.orientation);
      }
    } else {
      this.destroyPointer('hight');
    }
  }

  private updateFill() {
    let lowPos: number;
    let hightPos: number;

    if (this.data.isRange) {
      lowPos = this.data.lowPointer.position * 100;
      hightPos = (1 - this.data.hightPointer.position) * 100;
    } else {
      lowPos = 0;
      hightPos = (1 - this.data.lowPointer.position) * 100;
    }

    this.fill.update(lowPos, hightPos, this.data.orientation);
  }

  private updateTip() {
    let lowPosition: number = 0;
    let hightPosition: number = 0;

    let pointer: Pointer | undefined = this.pointers.get('low');
    if (pointer) {
      lowPosition = this.track.getAbsolutePosition(this.data.lowPointer.position);
    }

    pointer = this.pointers.get('hight');
    if (pointer) {
      hightPosition = this.track.getAbsolutePosition(this.data.hightPointer.position);
    }

    const tipData: TipData = new TipData(
      { value: this.data.lowPointer.value, position: lowPosition },
      { value: this.data.hightPointer.value, position: hightPosition },
      this.data.orientation,
      this.data.isRange,
      this.data.isVisibleTooltip,
    );

    this.tipManager.update(tipData);
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
