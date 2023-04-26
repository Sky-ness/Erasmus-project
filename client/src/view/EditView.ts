import View from "./View";

export default class EditView extends View {
  oliveTree: any;
  constructor(element: HTMLElement, oliveTree: any) {
    super(element);
    this.oliveTree = oliveTree;
  }
}
function PopupView(oliveTree: any) {}
