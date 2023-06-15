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

		// Écouter l'événement de soumission du formulaire
		form.addEventListener('submit', event => {
			event.preventDefault();

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
				fetch('api/oliveTrees', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				}).then(response => {
					if (response.ok) {
						alert('Ajout effectuée avec succès');
						window.location.href = 'index.html';
					} else {
						response.text().then(errorMessage => {
							alert(
								"Une erreur s'est produite lors de l'insertion: " + errorMessage
							);
						});
					}
				});
			} catch (error) {
				console.error(error);
			}
		});
	}
}
