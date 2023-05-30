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
	// add(oliveTree) {
	// 	fetch('https://mon-api.com/elements', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(oliveTree),
	// 	})
	// 		.then(response => response.json())
	// 		.then(data => console.log(data))
	// 		.catch(error => console.error(error));
	// }
}
