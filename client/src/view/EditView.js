import View from './View.js';

export default class EditView extends View {
	oliveTree;
	constructor(element, oliveTree) {
		super(element);
	}

	edit(primaryKey, oliveTree) {
		fetch('https://mon-api.com/elements/' + primaryKey, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(oliveTree),
		})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.error(error));
	}
}
// function PopupView(oliveTree) {}
