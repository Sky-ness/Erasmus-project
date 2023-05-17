import View from './View.js';

export default class AddView extends View {
	constructor(element) {
		super(element);
		this.hide();

		this.toggleAddButton = document.querySelector('.toggleAddButton');
		this.toggleAddButton.addEventListener('click', () => this.show());

		this.close = this.element.querySelector('.close');
		this.close.addEventListener('click', () => this.hide());

		window.addEventListener('click', event => {
			if (event.target == this.element) {
				this.hide();
			}
		});
	}
}
