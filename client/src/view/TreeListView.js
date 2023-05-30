import renderTreeThumbnail from '../function/RenderTreeThumbnail.js';
import View from './View.js';
export default class TreeListView extends View {
	constructor(element) {
		super(element);
		// détection de la soumission du formulaire de recherche
		this.show();
		this.searchForm = this.element.querySelector('.searchForm');
		this.searchForm.addEventListener('submit', event =>
			this.handleSearchFormSubmit(event)
		);
		this.paginationBar = this.element.querySelector('.pagination');
	}

	show() {
		super.show();
		this.renderTreeList();
	}

	renderTreeList(search = '', ordering) {
		// fetch(
		// 	`api/olives?search=${encodeURIComponent(
		// 		search
		// 	)}&ordering=${encodeURIComponent(ordering)}`
		// )
		fetch('api/oliveTrees')
			.then(response => response.json())
			.then(data => {
				// rendu de la liste des olive tree

				paginationData(this.element, data, 0, 50);

				pagination(data, 50).forEach(page => {
					this.paginationBar.innerHTML += `<button>${page}</button>`;
				});
				const button = this.paginationBar.querySelectorAll('button');
				button.forEach((indexBtn, index) => {
					indexBtn.addEventListener('click', event => {
						event.preventDefault();
						paginationData(this.element, data, index, 50);
					});
				});
			});
	}

	handleSearchFormSubmit(event) {
		event.preventDefault();
		const searchInput = this.searchForm.querySelector('[name=search]'),
			orderingSelect = this.searchForm.querySelector('[name=ordering]');
		this.renderTreeList(searchInput.value, orderingSelect.value);
	}
}
function pagination(trees, index) {
	let table = [];
	let number = 0;
	for (let i = 0; i <= trees.length; i += index) {
		table[number] = number++;
	}
	return table;
}
function paginationData(element, results, index, treeByPage) {
	let html = '';
	if (index == 0)
		results
			.slice(index, treeByPage)
			.forEach(tree => (html += renderTreeThumbnail(tree)));
	else
		results
			.slice(treeByPage * index, treeByPage + treeByPage * index)
			.forEach(tree => (html += renderTreeThumbnail(tree)));

	element.querySelector('.results').innerHTML = html;

	const expand = element
		.querySelector('.results')
		.querySelectorAll('.treeList .expand button');
	const expanded = element
		.querySelector('.results')
		.querySelectorAll('.treeList .expanded');

	console.log(expand);

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
}
