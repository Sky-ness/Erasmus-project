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
		promise.then(results => {
			this.ThumbnailGallery.innerHTML = renderTreeList(results);

			const more = this.ThumbnailGallery.querySelectorAll('.more button');
			const less = this.ThumbnailGallery.querySelectorAll('.less button');
			const expanded = this.ThumbnailGallery.querySelectorAll('.expanded');

			console.log(expanded[0].innerHTML);
			expanded.forEach(expanded => {
				expanded.style.display = 'none';
			});

			more.forEach((button, index) => {
				button.addEventListener('click', () => {
					expanded[index].style.display = 'block';
				});
			});
			less.forEach((button, index) => {
				button.addEventListener('click', () => {
					expanded[index].style.display = 'none';
				});
			});
		});
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
	trees.forEach(tree => (html += renderTreeThumbnail(tree)));
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
