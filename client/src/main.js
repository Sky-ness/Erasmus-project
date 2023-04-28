//import EditView from "./view/EditView.js";
//import AddView from "./view/addView.js";

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
		displayLessDataTrees(oliveTrees);
	});

function displayAllDataTrees(data) {
	data.forEach(oliveTree => {
		mainView.innerHTML += `<table>
			<tr>
				<th>Primary key</th>
				<th>Coordonate GPS</th>
				<th>Perimeter</th>
				<th>Branches</th>
				<th>Height</th>
			</tr>
			<tr>
				<td>${oliveTree.column1}</td>
				<td>X: ${oliveTree.longitude} | Y: ${oliveTree.latitude}</td>
				<td>base: ${oliveTree.basePerimeter} | at-1m30:${oliveTree.perimAt1m30}</td>
				<td>number: ${oliveTree.numberOfBranches} | size: ${oliveTree.branch}</td>
				<td>${oliveTree.height}</td>
			</tr>
			<tr>
				<th>Tree Code</th>
				<th>Cavitation</th>
				<th>Trunk shapes</th>
				<th>Trunk torsion</th>
			</tr>
			<tr>
				<td>${oliveTree.treeCode}</td>
				<td>${oliveTree.cavitation}</td> 
				<td>${oliveTree.trunkShapes}</td> 
				<td>${oliveTree.trunkTorsion}</td>
			</tr> 
			<tr>
				<th>Nisi</th>
				<th>Land use</th>
				<th>Paratiriseis</th>
			</tr>
			<tr>
				<td>${oliveTree.nisi}</td> 
				<td>${oliveTree.landUse}</td> 
				<td>${oliveTree.paratiriseis}</td>
			</tr>
			<tr>
				<button>less information</button>
			</tr>
		</table>`;
	});
}
function displayLessDataTrees(data) {
	data.forEach(oliveTree => {
		mainView.innerHTML += `<table>
				<tr>
					<th>Primary key</th>
					<th>Coordonate GPS</th>
					<th>Perimeter</th>
					<th>Number Of Branches</th>
					<th>Height</th>
				</tr>
				<tr>
					<td>${oliveTree.column1}</td>
					<td>X: ${oliveTree.longitude} | Y: ${oliveTree.latitude}</td>
					<td>base: ${oliveTree.basePerimeter} | at-1m30: ${oliveTree.perimAt1m30}</td>
					<td>number: ${oliveTree.numberOfBranches} | size: ${oliveTree.branch}</td>
					<td>${oliveTree.height}</td>
				</tr>
				<tr>
					<td colspan=\"5\"><a href=\"#\">more information</a></td>
				</tr>
			</table>`;
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
