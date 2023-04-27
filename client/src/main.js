//import EditView from "./view/EditView.js";
//import AddView from "./view/addView.js";

import OliveTree from '../../server/model/OliveTree.js';
import OliveTreeListView from './view/OliveTreeListView.js';

console.log('hello world');

//--------------------------------------jeu de données-------------------------------------------
const linkApi = 'api/oliveTrees';

//--------------------------------------View-----------------------------------------------------
// const mainView = new OliveTreeListView(olive, json);
// const editView = new EditView(".olive-trees .editView", oliveTree);
// const addView = new AddView(".olive-trees .editView");

const mainView = document.querySelector('.olive-trees .mainView');

const addView = document.querySelector('.olive-trees .addView');

addView.style.display = 'none';

let oliveTrees = [];
fetch(linkApi)
	.then(response => response.json())
	.then(data => {
		oliveTrees = data;
		displayTrees(oliveTrees);
	});

function displayTrees(data) {
	data.forEach(oliveTree => {
		mainView.innerHTML +=
			`<p>${oliveTree.column1}` +
			`${oliveTree.treeCode}` +
			`${oliveTree.longitude}` +
			`${oliveTree.latitude}` +
			`${oliveTree.nisi}` +
			`${oliveTree.perimAt1m30}` +
			`${oliveTree.basePerimeter}` +
			`${oliveTree.height}` +
			`${oliveTree.branch}` +
			`${oliveTree.numberOfBranches}` +
			`${oliveTree.cavitation}` +
			`${oliveTree.trunkShapes}` +
			`${oliveTree.trunkTorsion}` +
			`${oliveTree.landUse}` +
			`${oliveTree.paratiriseis}</p>`;
	});
}

/*
function refreshData(json){
    fetch(json)
        .then(response => response.json())
    	.then(data => olivesTree = data.results);
}
function splitTree(numberinOnePage){

}
function filter(){

}
function displayOliveTree(oliveTree){

}
function addOliveTree(oliveTree){

}
function editOliveTree(oliveTree) {
  
}
*/
