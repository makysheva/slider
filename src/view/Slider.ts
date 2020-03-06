import Track from './Track';
import Orientation from '../types/Orientation';
import '../scss/slider.scss';

class Slider {
  private container: HTMLElement;

  private track: Track;

  constructor(container: HTMLElement) {
    this.container = container;
    this.track = Track.create(this.container, Orientation.Horizontal);
    this.track.addClickListener(this.click.bind(this));
  }

  private click(position: number) {
    console.log(position);
    
  }

  
  public update() {

  }
}

export default Slider;
