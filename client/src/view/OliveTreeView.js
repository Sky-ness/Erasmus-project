import View from './View.js';
import renderTreeThumbnail from '../function/RenderTreeThumbnail.js';

export default class OliveTreeView extends View {
	constructor(element) {
		super(element);
		this.ThumbnailGallery = this.element.querySelector('.mainView');
		this.searchForm = this.element.querySelector('.searchForm');
		this.paginationBar = this.element.querySelector('.tabButton');
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
