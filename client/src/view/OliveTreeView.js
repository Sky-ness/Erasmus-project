import View from './View.js';
import renderTreeThumbnail from '../RenderTreeThumbnail.js';

export default class OliveTreeView extends View {
	constructor(element) {
		super(element);
		this.ThumbnailGallery = document.querySelector('.mainView');
		this.searchForm = document.querySelector('.searchForm');
		// this.searchForm.addEventListener('click', handleSearchFormSubmit);

		this.paginationBar = document.querySelector('.tabButton');
	}
	generateData(promise) {
		promise.then(
			results => (this.ThumbnailGallery.innerHTML = renderTreeList(results))
		);
	}
	generateButton(promise, treeByPage) {
		return promise.then(results => {
			tableButton(results, treeByPage).forEach(
				page => (this.paginationBar.innerHTML += `<button>${page}</button>`)
			);
		});
	}
}
function renderTreeList(trees) {
	let html = '';
	trees.forEach(tree => (html += renderTreeThumbnail(tree, false)));
	return html;
}
function tableButton(trees, index) {
	let table = [];
	let number = 0;
	for (let i = 0; i <= trees.length; i += index) {
		table[number] = number++;
	}
	return table;
}
