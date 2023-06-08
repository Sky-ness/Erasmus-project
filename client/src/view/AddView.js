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
			console.log('post');

			// Récupérer les valeurs du formulaire
			const inputs = document.querySelectorAll('.addTreeForm > input');

			const id = this.element.querySelector('input[name=id]').value;
			const treecode = this.element.querySelector('input[name=treecode]').value;
			const longitude = this.element.querySelector(
				'input[name=longitude]'
			).value;
			const latitude = this.element.querySelector('input[name=latitude]').value;
			const nisi = this.element.querySelector('input[name=nisi]').value;
			const perim_at_1m30 = this.element.querySelector(
				'input[name=perim_at_1m30]'
			).value;
			const base_perimeter = this.element.querySelector(
				'input[name=base_perimeter]'
			).value;
			const height = this.element.querySelector('input[name=height]').value;
			const branch = this.element.querySelector('input[name=branch]').value;
			const number_of_branches = this.element.querySelector(
				'input[name= number_of_branches]'
			).value;
			const cavitation = this.element.querySelector(
				'input[name=cavitation]'
			).value;
			const trunk_shapes = this.element.querySelector(
				'input[name=trunk_shapes]'
			).value;
			const trunk_torsion = this.element.querySelector(
				'input[name=trunk_torsion]'
			).value;
			const land_use = this.element.querySelector('input[name=land_use]').value;
			const paratiriseis = this.element.querySelector(
				'input[name=paratiriseis]'
			).value;

			const formData = {
				id,
				treecode,
				longitude,
				latitude,
				nisi,
				perim_at_1m30,
				base_perimeter,
				height,
				branch,
				number_of_branches,
				cavitation,
				trunk_shapes,
				trunk_torsion,
				land_use,
				paratiriseis,
			};

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

		// window.addEventListener('click', event => {
		// 	event.preventDefault();
		// 	if (event.target == this.element) {
		// 		this.hide();
		// 	}
		// });
	}
}
