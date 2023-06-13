import renderTreeThumbnail from '../function/RenderTreeThumbnail.js';
import View from './View.js';
export default class TreeListView extends View {
	constructor(element) {
		super(element);
		// détection de la soumission du formulaire de recherche
		this.show();
		this.results = this.element.querySelector('.results');

		this.paginationBar = this.element.querySelector('.pagination');

		this.searchForm = this.element.querySelector('.searchForm');
		this.searchForm.addEventListener('submit', event =>
			this.handleSearchFormSubmit(event)
		);
	}

	show() {
		super.show();
		this.renderTreeList();
	}

	renderTreeList(search = '', ordering) {
		fetch(
			`api/oliveTrees?search=${encodeURIComponent(
				search
			)}&ordering=${encodeURIComponent(ordering)}`
		)
			.then(response => response.json())
			.then(data => {
				// rendu de la liste des olive tree
				this.paginationBar.innerHTML = '';

				pagination(data, 50).forEach(page => {
					this.paginationBar.innerHTML += `<button>${page}</button>`;
				});

				this.paginationData(data, 0, 50);

				const button = this.paginationBar.querySelectorAll('button');
				button.forEach((indexBtn, index) => {
					indexBtn.addEventListener('click', event => {
						event.preventDefault();
						this.paginationData(data, index, 50);
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

	paginationData(results, index, treeByPage) {
		let html = '';
		if (index == 0)
			results
				.slice(index, treeByPage)
				.forEach(tree => (html += renderTreeThumbnail(tree)));
		else
			results
				.slice(treeByPage * index, treeByPage + treeByPage * index)
				.forEach(tree => (html += renderTreeThumbnail(tree)));

		this.results.innerHTML = html;

		const toggleEditButton = this.results.querySelectorAll('.toggleEditButton');

		const expand = this.results.querySelectorAll('.treeList .expand button');
		const expanded = this.results.querySelectorAll('.treeList .expanded');

		moreInformation(expand, expanded);
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

function moreInformation(expand, expanded) {
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
