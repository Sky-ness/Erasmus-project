//import EditView from "./view/EditView.js";
//import AddView from "./view/addView.js";
import renderTreeThumbnail from './RenderTreeThumbnail.js';

console.log('hello world');

//--------------------------------------jeu de données-------------------------------------------
const linkApi = 'api/oliveTrees';

//--------------------------------------View-----------------------------------------------------
// const mainView = new OliveTreeListView(olive, json);
// const editView = new EditView(".olive-trees .editView", oliveTree);
// const addView = new AddView(".olive-trees .editView");

const mainView = document.querySelector('.olive-trees .mainView');
const searchForm = document.querySelector('.searchForm');
const modal = document.querySelector('.modal');
const toggleAddButton = document.querySelector('.toggleAddButton');
const close = document.querySelector('.close');
const tabButton1 = document.querySelector('.tabButton');
// const tabButton = document.querySelectorAll('.tabButton button');

let oliveTrees = [];

searchForm.addEventListener('submit', handleSearchFormSubmit);

function sliceData(data, index) {
	if (index == 0) return data.slice(index, 5);
	else return data.slice(5 * index, 5 + 5 * index);
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

fetch('api/oliveTrees')
	.then(response => response.json())
	.then(data => {
		oliveTrees = data;
		// renderTreeList();
		displayLessDataTrees(sliceData(oliveTrees, 0));
		generateButton(oliveTrees);
		const tabButton = document.querySelectorAll('.tabButton button');
		tabButton.forEach((indexBtn, index) => {
			indexBtn.addEventListener('click', () => {
				console.log(index);
				displayLessDataTrees(sliceData(oliveTrees, index));
			});
		});
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
function displayAllDataTree(oliveTree) {
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
			<tr class=\"less\">
				<button>less information</button>
			</tr>
		</table>`;
}
function generateButton(data) {
	let j = 0;
	for (let i = 0; i <= data.length; i += 5) {
		tabButton1.innerHTML += `<button>${j}</button>`;
		j++;
	}
}
function displayLessDataTrees(data) {
	mainView.innerHTML = '';
	data.forEach(oliveTree => {
		mainView.innerHTML += `<table>
				<tr>
					<th>Primary key</th>
					<th>Coordonate GPS</th>
					<th>Perimeter</th>
					<th>Number Of Branches</th>
					<th>Height</th>
					<th><button class="toggleEditButton"><img src="images/website/pen2.ico" alt="edit"/><button></th>
				</tr>
				<tr class=\"data\">
					<td>${oliveTree.column1}</td>
					<td>X: ${oliveTree.longitude} | Y: ${oliveTree.latitude}</td>
					<td>base: ${oliveTree.basePerimeter} | at-1m30: ${oliveTree.perimAt1m30}</td>
					<td>number: ${oliveTree.numberOfBranches} | size: ${oliveTree.branch}</td>
					<td>${oliveTree.height}</td>
				</tr>
				<tr class=\"more\">
					<td colspan=\"5\"><a>more information</a></td>
				</tr>
			</table>`;
	});
}

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
