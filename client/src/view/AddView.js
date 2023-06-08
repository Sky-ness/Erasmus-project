import View from './View.js';

export default class AddView extends View {
	constructor(element) {
		super(element);
		this.hide();

		// Sélectionner le formulaire
		const form = document.querySelector('.addTreeForm');
		// console.log('form ' + form.innerHTML);

		this.toggleAddButton = document.querySelector('.toggleAddButton');
		this.toggleAddButton.addEventListener('click', () => this.show());

		this.close = this.element.querySelector('.close');
		this.close.addEventListener('click', () => this.hide());

		// window.addEventListener('click', event => {
		// 	event.preventDefault();
		// 	if (event.target == this.element) {
		// 		this.hide();
		// 	}
		// });

		// Écouter l'événement de soumission du formulaire
		form.addEventListener('submit', event => {
			event.preventDefault();
			console.log('post');

			// Récupérer les valeurs du formulaire
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

			// Créer un objet avec les données du formulaire

			try {
				fetch('http://localhost:8000/api/oliveTrees', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});
			} catch (error) {
				console.error(error);
			}
		});
	}
}
