const form = document.querySelector('.editTreeForm');
const inputs = form.querySelectorAll('input');

const url = new URL(window.location.href);

// Utiliser URLSearchParams pour accéder aux paramètres de l'URL
const params = new URLSearchParams(url.search);

// Récupérer la valeur du paramètre "id"
const id = params.get('id');

fetch(`api/oliveTrees/${id}`)
	.then(response => response.json())
	.then(data => {
		const tree = data;
		inputs[0].placeholder = tree.id;
		inputs[1].placeholder = tree.id;
	});

// Écouter l'événement de soumission du formulaire
form.addEventListener('submit', event => {
	event.preventDefault();

	const formData = {};

	inputs.forEach(field => {
		const fieldName = field.getAttribute('name');
		let fieldValue = field.value;
		if (fieldValue === '') {
			fieldValue = null;
		}
		formData[fieldName] = fieldValue;
	});

	// Créer un objet avec les données du formulaire

	try {
		fetch(`api/oliveTrees/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});
	} catch (error) {
		console.error(error);
	}
});
