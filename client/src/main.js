//import EditView from "./view/EditView.js";
//import AddView from "./view/addView.js";
import OliveTreeList from './model/OliveTreeList.js';

import OliveTreeView from './view/OliveTreeView.js';
import NavigationView from './view/navigationView.js';
import buildNav from './function/navbar.js';
import AddView from './view/AddView.js';

console.log('hello world');

//--------------------------------------jeu de données-------------------------------------------
const linkApi = 'api/oliveTrees';

//--------------------------------------View-----------------------------------------------------
const oliveTreesData = new OliveTreeList(linkApi);

const navigationView = new NavigationView('nav');
const mainView = new OliveTreeView('.olive-trees');
const addView = new AddView('.modal');
// const editView = new EditView(".olive-trees .editView", oliveTree);

const treeByPage = 50;

//------------------------------------------nav bar ----------------------------------------------
buildNav(navigationView.element);

//--------------------------------------main--------------------------------------------
mainView.generateData(oliveTreesData.sliceData(0, treeByPage));

mainView.generateButton(oliveTreesData.oliveTrees, treeByPage).then(() => {
	const button = document.querySelectorAll('.tabButton button');
	button.forEach((indexBtn, index) => {
		indexBtn.addEventListener('click', event => {
			event.preventDefault();
			mainView.generateData(oliveTreesData.sliceData(index, treeByPage));
		});
	});
});

mainView.searchForm.addEventListener('click', event => {
	event.preventDefault();
	let searchInput = mainView.searchForm.querySelector('[name=search]');
	mainView.generateData(oliveTreesData.filterData(searchInput.value));
});

navigationView.region.forEach(region => {
	region.addEventListener('click', event => {
		event.preventDefault();
		mainView.generateData(oliveTreesData.filterData(region.innerHTML));
	});
});

// mainView.generateData(oliveTreesData.ranking());
