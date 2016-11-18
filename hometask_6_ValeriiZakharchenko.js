/*
API
	GET api/books/:id -> get Book detais { id: 15, name: 'The Adventures of Tom Sawyer', authorId: 25 }

	GET api/authors/:id -> get Author detais { name: 'Mark Twain' books: [34, 57, 69, 15] }

	GET api/bestsellers/similar/:id
	-> get mutiple book names

	'The Prince and the Pauper',
	'Golden Age',
	'The Adventures of Huckleberry Finn',
	'Old Times on the Mississippi'
*/

/*
HTML
	<div>
		<div id="book">
		</div>

		<div id="author">
		</div>

		<div id="similar">
		</div>
	</div>
*/

function getBookById(id) {
	document.getElementById('book').textContent = 'Please wait. Book is loading';
	fetch ('api/books/' + id)
	.then ( function (response) {
			document.getElementById('book').textContent = JSON.parse(response).name;
		})
	.catch ( function (response) {
			document.getElementById('book').textContent = 'Error. Please refresh your browser';
		})
}

function loadPage(bookId) {
	document.getElementById('book').textContent = 'Please wait. Book is loading';
	document.getElementById('author').textContent = 'Please wait. Author details are loading';
	document.getElementById('similar').textContent = 'Please wait. Similar books are loading';
	
	fetch ('api/books/' + bookId)				//Use input argument of loadPage (bookId) VS id
	.then ( function (response) { document.getElementById('book').textContent = JSON.parse(response).name; 
				return fetch ('api/autors' + JSON.parse(response).authorId) },
			function (response) { document.getElementById('book').textContent = 'Error. Please refresh your browser'; })
	.then ( function (response) { var r = JSON.parse(response);
				document.getElementById('author').textContent = r.name;	// { name: 'Mark Twain' books: [34, 57, 69, 15] } 
				var similarBooksLoaded = 0;
				var similarBooksAmount = r.books.lenght;
				for (var i = 0, len = r.books.length; i < len; i++ ) {
					fetch ('api/bestsellers/similar/' + r.books[i])
					.then ( function (response) { 
						var p = document.getElementById('similar').appendChild('p').textContent = JSON.stringify(response);
						similarBooksLoaded += 1

						if (similarBooksLoaded === similarBooksAmount) {
							alert('Horray everything loaded');
						}
					})
					.catch ( function () { document.getElementById('similar').textContent = 'Error. Please refresh your browser'; });
				}
				
			})
	.catch ( function () { document.getElementById('author').textContent = 'Error. Please refresh your browser'; } );
} 
