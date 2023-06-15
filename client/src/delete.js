import renderTreeThumbnail from './function/RenderTreeThumbnail.js';

const url = new URL(window.location.href);

// Utiliser URLSearchParams pour accéder aux paramètres de l'URL
const params = new URLSearchParams(url.search);

// Récupérer la valeur du paramètre "id"
const id = params.get('id');

function windowAlert() {
	if (confirm('Are you sure you want to delete this tree !') == true) {
		try {
			fetch(`api/oliveTrees/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			console.log(error);
		}

		// Code à exécuter en cas d'erreur de requête
	} else {
		window.location.href = 'index.html';
	}
}

windowAlert();
