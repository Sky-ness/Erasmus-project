//import EditView from "./view/EditView.js";
//import AddView from "./view/addView.js";
import renderTreeThumbnail from './RenderTreeThumbnail.js';
import OliveTreeList from './view/OliveTreeList.js';
import OliveTreeView from './view/OliveTreeView.js';

console.log('hello world');

//--------------------------------------jeu de données-------------------------------------------
const linkApi = 'api/oliveTrees';

//--------------------------------------View-----------------------------------------------------
const oliveTreesData = new OliveTreeList(linkApi);
const mainView = new OliveTreeView('.olive-trees');
// const editView = new EditView(".olive-trees .editView", oliveTree);
// const addView = new AddView(".olive-trees .editView");
const treeByPage = 50;

mainView.generateData(oliveTreesData.sliceData(0, treeByPage));

mainView.generateButton(oliveTreesData.oliveTrees, treeByPage).then(() => {
	const button = document.querySelectorAll('.tabButton button');
	button.forEach((indexBtn, index) => {
		indexBtn.addEventListener('click', () => {
			mainView.generateData(oliveTreesData.sliceData(index, treeByPage));
		});
	});
});

// function handleSearchFormSubmit(event, searchForm, trees) {
// 	event.preventDefault();
// 	const searchInput = searchForm.querySelector('[name=search]');
// 	renderTreeListForm(searchInput.value, trees);
// }
// function renderTreeListForm(search = '', trees) {
// 	let html = '';
// 	trees
// 		.filter(tree => tree.column1.toLowerCase().includes(search.toLowerCase()))
// 		.forEach(tree => (html += renderTreeThumbnail(tree)));
// 	return html;
// }
