// Sélectionner le formulaire
const form = document.querySelector('.editTreeForm');
// console.log('form ' + form.innerHTML);

const url = new URL(window.location.href);

// Utiliser URLSearchParams pour accéder aux paramètres de l'URL
const params = new URLSearchParams(url.search);

// Récupérer la valeur du paramètre "id"
const id = params.get('id');

console.log(id);

fetch(`api/oliveTrees/${id}`)
	.then(response => response.json())
	.then(data => {
		const tree = data[0];
		console.log(data[0]);
		form.innerHTML = `<form class="editTreeForm">
        <div>
            <label>ID</label>
            <input type="text" name="id" id="id" value="${tree.id}" readonly class="readonly">

            <label>treecode</label>
            <input type="text" name="treecode" placeholder="${tree.treecode}" id="treecode" placeholder="${tree.treecode}" required>

            <label>longitude</label>
            <input type="text" name="longitude" id="longitude" placeholder="${tree.longitude}">

            <label>latitude</label>
            <input type="text" name="latitude" id="latitude" placeholder="${tree.latitude}">

            <label>NISI</label>
            <input type="number" name="nisi" id="nisi" placeholder="${tree.nisi}">

            <label>perimeter at 1m30</label>
            <input type="number" name="perim_at_1m30" id="perim_at_1m30" placeholder="${tree.perim_at_1m30}">

            <label> base perimeter</label>
            <input type="number" name="base_perimeter" id="base_perimeter" placeholder="${tree.base_perimeter}">

            <label>Height</label>
            <input type="number" name="height" id="height" placeholder="${tree.height}">

            <label>branch</label>
            <input type="number" name="branch" id="branch" placeholder="${tree.branch}">

            <label>number of branches</label>
            <input type="number" name="number_of_branches" id="number_of_branches" placeholder="${tree.number_of_branches}">

            <label> cavitation </label>
            <input type="number" name="cavitation" id="cavitation" placeholder="${tree.cavitation}">

            <label>trunk shapes </label>
            <input type="number" name="trunk_shapes" id="trunk_shapes" placeholder="${tree.trunk_shapes}">

            <label>trunk torsion </label>
            <input type="number" name="trunk_torsion" id="trunk_torsion" placeholder="${tree.trunk_torsion}">

            <label>land use </label>
            <input type="text" name="land_use" id="land_use" placeholder="${tree.land_use}">

            <label>paratiriseis </label>
            <input type="number" name="paratiriseis" id="paratiriseis" placeholder="${tree.paratiriseis}">
        </div>
        <button type="submit"> Send </button>

    </form>`;
	});

// Écouter l'événement de soumission du formulaire
form.addEventListener('submit', event => {
	event.preventDefault();
	console.log('edit');

	// Récupérer les valeurs du formulaire
	const inputs = document.querySelectorAll('.editTreeForm input');

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
		fetch(`http://localhost:8000/api/oliveTrees/${id}`, {
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
