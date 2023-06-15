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
		const api =
			!search && !ordering
				? `api/oliveTrees`
				: `api/oliveTrees/a/ranking?search=${encodeURIComponent(
						search
				  )}&ordering=${encodeURIComponent(ordering)}`;
		fetch(api)
			.then(response => response.json())
			.then(data => {
				console.log(data);
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

let currentPage = 1;

function createPagination(currentPage, totalPages) {
	const paginationContainer = document.getElementById('pagination-container');
	paginationContainer.innerHTML = '';

	const maxVisiblePages = 7; // Nombre maximum de boutons de pagination visibles

	let startPage = 1;
	let endPage = totalPages;

	if (totalPages > maxVisiblePages) {
		if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
			endPage = maxVisiblePages;
		} else if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
			startPage = totalPages - maxVisiblePages + 1;
		} else {
			startPage = currentPage - Math.floor(maxVisiblePages / 2);
			endPage = currentPage + Math.floor(maxVisiblePages / 2);
		}
	}

	if (startPage > 1) {
		createPageButton(1, '1');
		if (startPage > 2) {
			createEllipsis();
		}
	}

	for (let i = startPage; i <= endPage; i++) {
		createPageButton(i, i.toString(), i === currentPage);
	}

	if (endPage < totalPages) {
		if (endPage < totalPages - 1) {
			createEllipsis();
		}
		createPageButton(totalPages, totalPages.toString());
	}
}

function createPageButton(pageNumber, label, isActive = false) {
	const paginationContainer = document.getElementById('pagination-container');
	const pageButton = document.createElement('button');
	pageButton.innerText = label;

	if (isActive) {
		pageButton.classList.add('active');
	}

	pageButton.addEventListener('click', () => {
		console.log('Page', pageNumber);
		createPagination(pageNumber, totalPages);
	});

	paginationContainer.appendChild(pageButton);
}

function createEllipsis() {
	const paginationContainer = document.getElementById('pagination-container');
	const ellipsisSpan = document.createElement('span');
	ellipsisSpan.innerText = '...';
	paginationContainer.appendChild(ellipsisSpan);
}

const totalPages = 16;

createPagination(currentPage, totalPages);
