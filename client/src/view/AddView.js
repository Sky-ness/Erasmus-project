import View from './View.js';

export default class AddView extends View {
	constructor(element) {
		super(element);
		//ouvre le modal
		toggleAddButton.onclick = function () {
			modal.style.display = 'block';
		};

		close.onclick = function () {
			modal.style.display = 'none';
		};

		// fermer quand on clique n'importe ou ailleur
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = 'none';
			}
		};
		this.modal = document.querySelector('.modal');
		this.toggleAddButton = document.querySelector('.toggleAddButton');
		this.close = document.querySelector('.close');
	}
}
