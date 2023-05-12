import View from './View.js';
import renderTreeThumbnail from '../RenderTreeThumbnail.js';

export default class OliveTreeView extends View {
	constructor(element) {
		super(element);
		this.ThumbnailGallery = document.querySelector('.mainView');
		console.log(this.ThumbnailGallery);

		this.searchForm = document.querySelector('.searchForm');
		// this.searchForm.addEventListener('click', handleSearchFormSubmit);

		this.paginationBar = document.querySelector('.tabButton');
		this.button = this.paginationBar.querySelectorAll('button');
	}
	generateButton(size) {
		let number = 0;
		for (let i = 0; i <= size; i += 5) {
			this.paginationBar.innerHTML += `<button>${number}</button>`;
			number++;
		}
	}
	generateData(promise) {
		promise.then(
			trees => (this.ThumbnailGallery.innerHTML = renderTreeList(trees))
		);

		// this.button.forEach((indexBtn, index) => {
		// 	indexBtn.addEventListener('click', () => {
		// 		console.log(index);
		// 		this.ThumbnailGallery = renderTreeList(trees);
		// 	});
		// });
	}
}
function renderTreeList(trees) {
	let html = '';
	trees.forEach(tree => (html += renderTreeThumbnail(tree, false)));
	return html;
}
