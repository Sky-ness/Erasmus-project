import View from './View.js';

export default class DeleteView extends View {
	constructor(element) {
		super(element);
		this.hide();

		// Sélectionner le formulaire
		const form = document.querySelector('.addTreeForm');
		// console.log('form ' + form.innerHTML);

		this.toggleAddButton = document.querySelector('.toggleEditButton');
		this.toggleAddButton.addEventListener('click', () => this.show());

		const url = new URL(window.location.href);

		// Utiliser URLSearchParams pour accéder aux paramètres de l'URL
		const params = new URLSearchParams(url.search);

		// Récupérer la valeur du paramètre "id"
		const id = params.get('id');

		function windowAlert() {
			if (confirm('Are you sure you want to delete this tree !') == true) {
				try {
					fetch(`http://localhost:8000/api/oliveTrees/${id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(formData),
					});
				} catch (error) {
					console.error(error);
				}
			} else {
				window.location.href = 'index.html';
			}
		}
	}
}
