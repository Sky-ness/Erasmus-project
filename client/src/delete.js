import renderTreeThumbnail from './function/RenderTreeThumbnail.js';

const url = new URL(window.location.href);

// Utiliser URLSearchParams pour accéder aux paramètres de l'URL
const params = new URLSearchParams(url.search);

// Récupérer la valeur du paramètre "id"
const id = params.get('id');

const results = document.querySelector('.results');

fetch(`api/oliveTrees/${id}`)
	.then(response => response.json())
	.then(data => {
		results.innerHTML = renderTreeThumbnail(data[0]);
	});

function windowAlert() {
	if (confirm('Are you sure you want to delete this tree !') == true) {
		fetch(`api/oliveTrees/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (response.ok) {
					alert('Suppression effectuée avec succès');
					window.location.href = 'index.html';
					// Code à exécuter après la suppression réussie
				} else {
					alert("Une erreur s'est produite lors de la suppression");
					// Code à exécuter en cas d'erreur de suppression
				}
			})
			.catch(error);
		console.error(error);

		// Code à exécuter en cas d'erreur de requête
	} else {
		window.location.href = 'index.html';
	}
}

windowAlert();
