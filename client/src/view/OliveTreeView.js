import View from './View.js';
import renderTreeThumbnail from '../function/RenderTreeThumbnail.js';

export default class OliveTreeView extends View {
	constructor(element) {
		super(element);
		this.ThumbnailGallery = this.element.querySelector('.mainView');
		this.searchForm = this.element.querySelector('.searchForm');
		this.paginationBar = this.element.querySelector('.tabButton');
		this.reload = this.element.querySelector('.rank');
	}
	generateThumbnail(promise) {
		promise.then(results => {
			this.ThumbnailGallery.innerHTML = renderTreeList(results);

			const expand = this.ThumbnailGallery.querySelectorAll('.more button');
			const expanded = this.ThumbnailGallery.querySelectorAll('.expanded');

			expanded.forEach(expanded => {
				expanded.style.display = 'none';
			});

			expand.forEach((button, index) => {
				let i = 1;
				button.addEventListener('click', () => {
					if (i % 2 != 0) {
						expand[index].innerHTML = 'less information';
						expanded[index].style.display = 'block';
					} else {
						expand[index].innerHTML = 'more information';
						expanded[index].style.display = 'none';
					}
					i++;
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
