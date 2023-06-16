const url = new URL(window.location.href);

// Use URLSearchParams to access to the parameters
const params = new URLSearchParams(url.search);

// Get the parameter id on the search bar
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
	} else {
		window.location.href = 'index.html';
	}
}

windowAlert();
