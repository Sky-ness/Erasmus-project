const form = document.querySelector('.editTreeForm');
const inputs = form.querySelectorAll('input');

const url = new URL(window.location.href);

// Use URLSearchParams to access to the parameters
const params = new URLSearchParams(url.search);

// get the value of the id parameter
const id = params.get('id');

fetch(`api/oliveTrees/${id}`)
	.then(response => response.json())
	.then(data => {
		const tabTree = Object.values(data);
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].value = tabTree[i];
			inputs[i].placeholder = tabTree[i];
		}
	});

// Add an event listener when you submit the form
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

	// create a tree with the form data
	try {
		fetch(`api/oliveTrees/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		}).then(response => {
			if (response.ok) {
				alert('Modification effectuée avec succès');
				window.location.href = 'index.html';
			} else {
				response.text().then(errorMessage => {
					alert(
						"Une erreur s'est produite lors de la modification: " + errorMessage
					);
				});
			}
		});
	} catch (error) {
		console.error(error);
	}
});
