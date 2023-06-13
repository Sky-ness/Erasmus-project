import NavigationView from './view/navigationView.js';
import AddView from './view/AddView.js';
import TreeListView from './view/TreeListView.js';
import EditView from './view/EditView.js';

console.log('hello world');

//--------------------------------------View-----------------------------------------------------
const treeListView = new TreeListView('.viewContent > .treeList');
const navigationView = new NavigationView('nav');
const addView = new AddView('.modal');
// const editView = new EditView('.editTreeForm');

const url = new URL(window.location.href);

// Utiliser URLSearchParams pour accéder aux paramètres de l'URL
const params = new URLSearchParams(url.search);

// Récupérer la valeur du paramètre "id"
const id = params.get('id');

function windowAlert() {
	if (confirm('Are you sure you want to delete this tree !') == true) {
		try {
			fetch(`http://localhost:8000/api/oliveTrees/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
		} catch (error) {
			console.error(error);
		}
	} else {
		window.location.href = 'index.html';
	}
}
