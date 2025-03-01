import renderTreeThumbnail from '../function/RenderTreeThumbnail.js';
import View from './View.js';

const treeByPage = 10;
const pagesPerView = 10;

export default class TreeListView extends View {
	constructor(element) {
		super(element);

		this.show();

		this.currentPage = 0;
		this.results = this.element.querySelector('.results');

		this.pagination = this.element.querySelector('.pagination');
		this.page = this.pagination.querySelector('.page');

		this.previousButton = this.pagination.querySelector('.previous');
		this.nextButton = this.pagination.querySelector('.next');

		this.searchForm = this.element.querySelector('.searchForm');
		this.searchForm.addEventListener('submit', event =>
			this.handleSearchFormSubmit(event)
		);

		this.titlesMenu = document.querySelectorAll('.nav-link');
		this.titlesMenu.forEach(title => {
			title.addEventListener('click', () => {
				this.renderTreeList(title.name, '');
			});
		});
	}

	show() {
		super.show();
		this.renderTreeList();
	}

	// renderList of the olive trees
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
				this.currentPage = 0;

				this.page.innerHTML = '';

				// generate pagination button
				let page = 0;

				for (let i = 0; i <= data.length; i += treeByPage) {
					page === 0
						? (this.page.innerHTML += `<button class="active"> 1 </button>`)
						: (this.page.innerHTML += `<button>${page + 1}</button>`);
					page++;
				}

				// Generate data of the first page
				this.data(data, this.currentPage, treeByPage);

				const button = this.page.querySelectorAll('button');

				// Generate event of the next and previous button to see the other page
				this.nextButton.onclick = () => this.nextPage(button);
				this.previousButton.onclick = () => this.previousPage(button);

				// display the buttons
				this.showPage(button);

				button.forEach((indexBtn, index) => {
					indexBtn.addEventListener('click', event => {
						event.preventDefault();
						const current = document.querySelector('.active');
						current.classList.remove('active');
						indexBtn.classList.add('active');

						this.data(data, index, treeByPage);
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

	data(results, index, treeByPage) {
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

		const more = this.results.querySelectorAll('.more');
		const less = this.results.querySelectorAll('.less');
		const information = this.results.querySelectorAll('.hide');

		moreInformation(more, less, information);
	}
	previousPage(pages) {
		if (this.currentPage > 0) {
			this.currentPage--;
			this.showPage(pages);
		}
	}
	nextPage(pages) {
		if (this.currentPage <= Math.ceil(pages.length / pagesPerView) - 1) {
			this.currentPage++;
			this.showPage(pages);
		}
	}
	showPage(pages) {
		var startIndex = this.currentPage * pagesPerView;
		var endIndex = startIndex + pagesPerView;

		for (var i = 0; i < pages.length; i++) {
			if (i >= startIndex && i < endIndex) {
				pages[i].style.display = 'inline';
			} else {
				pages[i].style.display = 'none';
			}
		}
	}
}
function moreInformation(more, less, information) {
	more.forEach((button, index) => {
		button.addEventListener('click', () => {
			more[index].innerHTML = '';
			less[index].innerHTML = '<button> less information </button>';
			for (let i = 0; i < 14; i++) {
				information[index * 14 + i].classList.remove('hide');
			}
		});
	});
	less.forEach((button, index) => {
		button.addEventListener('click', () => {
			more[index].innerHTML = '<button> more information </button>';
			less[index].innerHTML = '';
			for (let i = 0; i < 14; i++) {
				information[index * 14 + i].classList.add('hide');
			}
		});
	});
}
