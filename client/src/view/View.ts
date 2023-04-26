export default class View {
  element: HTMLElement;
  constructor(element: HTMLElement) {
    this.element = element;
    this.hide();
  }
  show() {
    this.element.style.display = "block";
  }
  hide() {
    this.element.style.display = "none";
  }
}
