//import EditView from "./view/EditView.js";
//import AddView from "./view/addView.js";
import { doc } from 'prettier';
import renderTreeThumbnail from './RenderTreeThumbnail.js';

console.log('hello world');

//--------------------------------------jeu de données-------------------------------------------
const linkApi = 'api/oliveTrees';

//--------------------------------------View-----------------------------------------------------
// const mainView = new OliveTreeListView(olive, json);
// const editView = new EditView(".olive-trees .editView", oliveTree);
// const addView = new AddView(".olive-trees .editView");

const mainView = document.querySelector('.olive-trees .mainView');
const addView = document.querySelector('.olive-trees .addView');
const searchForm = document.querySelector('.searchForm');
const addViewForm = document.querySelector('.addViewForm');
const modal = document.querySelector('.modal');
const toggleAddButton = document.querySelector('.toggleAddButton');
const close = document.querySelector('.close');

let oliveTrees = [];
let oliveTreesLimited = [];

fetch('api/oliveTrees')
	.then(response => response.json())
	.then(data => {
		oliveTrees = data;
		oliveTreesLimited = data.slice(0, 5);
		// renderTreeList();
		displayLessDataTrees(oliveTreesLimited);
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

function renderTreeList(search = '') {
	let html = '';
	oliveTrees
		.filter(tree => tree.column1.toLowerCase().includes(search.toLowerCase()))
		.forEach(tree => (html += renderTreeThumbnail(tree)));

	document.querySelector('.olive-trees .mainView').innerHTML = html;
}

function handleSearchFormSubmit(event) {
	event.preventDefault();
	const searchInput = searchForm.querySelector('[name=search]');
	renderTreeList(searchInput.value);
}

searchForm.addEventListener('submit', handleSearchFormSubmit);

//ouvre le modal
toggleAddButton.onclick = function () {
	modal.style.display = 'block';
};

close.onclick = function () {
	modal.style.display = 'none';
};

// fermer quand on clique n'importe ou ailleur
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};
