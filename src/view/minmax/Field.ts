class Field {
  private parent: HTMLElement;

  private fieldElement: HTMLElement;

  private key: string;

  private clickHandler: (key: string) => void;

  constructor(parent: HTMLElement, key: string) {
    this.parent = parent;
    this.key = key;

    this.fieldElement = document.createElement('div');
    this.fieldElement.classList.add('slider__range');
    this.parent.appendChild(this.fieldElement);

    this.fieldElement.addEventListener('click', this.onClick.bind(this));
  }

  public update(value: string) {
    this.fieldElement.innerHTML = value;
  }

  public addClickListener(clickHandler: (key: string) => void) {
    this.clickHandler = clickHandler;
  }

  private onClick() {
    this.clickHandler.call(this, this.key);
  }
}

export default Field;
