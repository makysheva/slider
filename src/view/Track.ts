import Orientation from '../types/Orientation';

class Track {
  private parent: HTMLElement;

  private trackElement: HTMLElement;

  private orientation: Orientation;

  private clickFn: Function | null;

  public static create(parent: HTMLElement, orientation: Orientation): Track {
    const track: Track = new Track();
    track.parent = parent;
    track.orientation = orientation;

    track.trackElement = document.createElement('div');
    track.parent.appendChild(track.trackElement);
    track.trackElement.classList.add('slider__track');

    if (track.orientation === Orientation.Horizontal) {
      track.trackElement.classList.add('slider__track_horizontal');
    } else {
      track.trackElement.classList.add('slider__track_vertical');
    }

    track.trackElement.addEventListener('click', track.onClick.bind(track));

    return track;
  }

  public addClickListener(fn: (position: number) => void) {
    this.clickFn = fn;
  }

  public destroy() {
    this.clickFn = null;
    this.parent.removeChild(this.trackElement);
  }

  private onClick(e: MouseEvent) {
    const rect: DOMRect = this.trackElement.getBoundingClientRect();
    let position: number;

    if (this.orientation === Orientation.Horizontal) {
      position = (e.clientX - rect.left) / rect.width;
    } else {
      position = 1 - ((e.clientY - rect.top) / rect.height);
    }

    if (this.clickFn) {
      this.clickFn.call(null, position);
    }
  }
}

export default Track;
