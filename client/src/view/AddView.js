import View from './View.js';

export default class AddView extends View {
	constructor(element) {
		super(element);
		this.hide();

		// Select the form
		const form = document.querySelector('.addTreeForm');

		this.toggleAddButton = document.querySelector('.toggleAddButton');
		this.toggleAddButton.addEventListener('click', () => this.show());

		this.close = this.element.querySelector('.close');
		this.close.addEventListener('click', () => this.hide());

		// add an event listener when you submit the form
		form.addEventListener('submit', event => {
			event.preventDefault();

			// get the values of the form
			const inputs = document.querySelectorAll('.addTreeForm input');

			const formData = {};

			inputs.forEach(field => {
				const fieldName = field.getAttribute('name');
				let fieldValue = field.value;
				if (fieldValue === '') {
					fieldValue = null;
				}
				formData[fieldName] = fieldValue;
			});

			// create a tree with the data enter on the form

			try {
				fetch('api/oliveTrees', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				}).then(response => {
					if (response.ok) {
						alert('the tree was successfuly add');
						window.location.href = 'index.html';
					} else {
						response.text().then(errorMessage => {
							alert('an error has occured : ' + errorMessage);
						});
					}
				});
			} catch (error) {
				console.error(error);
			}
		});
	}
}
