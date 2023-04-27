import View from "./View.js";

export default class EditView extends View {
  oliveTree;
  constructor(element, oliveTree) {
    super(element);
    this.oliveTree = oliveTree;
  }
}
// function PopupView(oliveTree) {}
