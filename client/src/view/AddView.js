import View from './View.js';

export default class AddView extends View {
	constructor(element) {
		super(element);
		this.hide();

		this.modal = this.element.querySelector('.modal');

		this.toggleAddButton = document.querySelector('.toggleAddButton');
		this.toggleAddButton.addEventListener('click', () => this.show());

		this.close = this.element.querySelector('.close');
		this.close.addEventListener('click', () => this.hide());
	}
}
