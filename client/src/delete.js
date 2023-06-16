const url = new URL(window.location.href);

// Use URLSearchParams to access to the parameters
const params = new URLSearchParams(url.search);

// Get the parameter id on the search bar
const id = params.get('id');

const results = document.querySelector('.results');

// fetch(`api/oliveTrees/${id}`)
// 	.then(response => response.json())
// 	.then(data => {
// 		results.innerHTML = renderTreeThumbnail(data);
// 		const divs = document.querySelectorAll('div');
// 		divs.forEach(div => {
// 			console.log('test');
// 			div.classList.replace('hide', 'cell');
// 			console.log(div);
// 		});
// 	});

function windowAlert() {
	if (confirm('Are you sure you want to delete this tree !') == true) {
		try {
			fetch(`api/oliveTrees/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				// .then(() =>
				// 	setTimeout(function () {
				// 		console.log('');
				// 		alert('well supressed tree');
				// 	}, 2000000)
				// )
				.then(() => (window.location.href = 'index.html'));
		} catch (error) {
			console.log(error);
		}
	} else {
		window.location.href = 'index.html';
	}
}

windowAlert();
