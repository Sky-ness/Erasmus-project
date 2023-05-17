//import EditView from "./view/EditView.js";
//import AddView from "./view/addView.js";
import OliveTreeList from './model/OliveTreeList.js';

import OliveTreeView from './view/OliveTreeView.js';
import NavigationView from './view/navigationView.js';
import AddView from './view/AddView.js';

console.log('hello world');

//--------------------------------------jeu de données-------------------------------------------
const linkApi = 'api/oliveTrees';

//--------------------------------------View-----------------------------------------------------
const oliveTreesData = new OliveTreeList(linkApi);
const mainView = new OliveTreeView('.olive-trees');
const navigationView = new NavigationView('nav');
const addView = new AddView('.modal');
// const editView = new EditView('.editView', oliveTree);

const treeByPage = 50;

//--------------------------------------main--------------------------------------------
const data0 = oliveTreesData.sliceData(0, treeByPage);

mainView.generateThumbnail(data0);

mainView.generateButton(oliveTreesData.oliveTrees, treeByPage).then(() => {
	const button = document.querySelectorAll('.tabButton button');
	button.forEach((indexBtn, index) => {
		indexBtn.addEventListener('click', event => {
			event.preventDefault();
			mainView.generateThumbnail(oliveTreesData.sliceData(index, treeByPage));
		});
	});
});

mainView.searchForm.addEventListener('click', event => {
	event.preventDefault();
	if (mainView.paginationBar != undefined)
		mainView.paginationBar.innerHTML = '';

	const searchInput = mainView.searchForm.querySelector('[name=search]');

	const data1 = oliveTreesData.filterData(searchInput.value);

	mainView.generateThumbnail(
		data1.then(results => results.slice(0, treeByPage))
	);

	mainView.generateButton(data1, treeByPage).then(() => {
		const button = document.querySelectorAll('.tabButton button');
		button.forEach((indexBtn, index) => {
			indexBtn.addEventListener('click', event => {
				event.preventDefault();
				mainView.generateThumbnail(slicer(data1, index, treeByPage));
			});
		});
	});
});

navigationView.region.forEach(region => {
	region.addEventListener('click', event => {
		event.preventDefault();
		if (mainView.paginationBar != undefined)
			mainView.paginationBar.innerHTML = '';

		const data2 = oliveTreesData.filterData(region.name);

		mainView.generateThumbnail(
			data2.then(results => results.slice(0, treeByPage))
		);

		mainView.generateButton(data2, treeByPage).then(() => {
			const button = document.querySelectorAll('.tabButton button');
			button.forEach((indexBtn, index) => {
				indexBtn.addEventListener('click', event => {
					event.preventDefault();
					mainView.generateThumbnail(slicer(data2, index, treeByPage));
				});
			});
		});
	});
});

// mainView.generateThumbnail(oliveTreesData.ranking());
function slicer(promise, index, treeByPage) {
	if (index == 0)
		return promise.then(results => results.slice(index, treeByPage));
	else
		return promise.then(results =>
			results.slice(treeByPage * index, treeByPage + treeByPage * index)
		);
}
