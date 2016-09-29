import '../css/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

const booksPropType = React.PropTypes.arrayOf(React.PropTypes.shape({
	id: React.PropTypes.number,
	title: React.PropTypes.string,
	category: React.PropTypes.string,
	price: React.PropTypes.number,
	author: React.PropTypes.shape({
		id: React.PropTypes.number,
		firstName: React.PropTypes.string,
		lastName: React.PropTypes.string
	})
}));

class BookTable extends React.Component {

	static propTypes = {
		books: booksPropType
	}

	render() {
		return <table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Category</th>
					<th>Price</th>
					<th>Author</th>
				</tr>
			</thead>
			<tbody>
				{this.props.books.map(book => <tr key={book.id}>
					<td>{book.title}</td>
					<td>{book.category}</td>
					<td>{book.price}</td>
					<td>{book.author.firstName} {book.author.lastName}</td>
				</tr>)}
			</tbody>
		</table>;
	}

}

class BookForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			bookTitle: '',
			bookCategory: '',
			bookPrice: 0,
			bookAuthorId: 1
		};

		this.onChange = this.onChange.bind(this);
		this.addBook = this.addBook.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	addBook() {

		// add code to post the author

		this.setState({
			bookTitle: '',
			bookCategory: '',
			bookPrice: 0,
			bookAuthorId: 1
		});
	}

	render() {
		return <form>
			<div>
				<label htmlFor="book-title">Title:</label>
				<input type="text" id="book-title" name="bookTitle"
					value={this.state.booKTitle} onChange={this.onChange} />
			</div>
			<div>
				<label htmlFor="book-category">Category:</label>
				<input type="text" id="book-category" name="bookCategory"
					value={this.state.booKCategory} onChange={this.onChange} />
			</div>
			<div>
				<label htmlFor="book-price">Price:</label>
				<input type="text" id="book-price" name="bookPrice"
					value={this.state.booKPrice} onChange={this.onChange} />
			</div>
			<div>
				<label htmlFor="book-author-id">Author Id:</label>
				<input type="text" id="book-author-id" name="bookAuthorId"
					value={this.state.booKAuthorId} onChange={this.onChange} />
			</div>
			<button type="button" onClick={this.addBook}>Add Book</button>
		</form>;
	}

}

class BookTool extends React.Component {

	static propTypes = {
		books: booksPropType
	}

	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			<BookTable books={this.props.books} />
			<BookForm />
		</div>;
	}

}

const req = {
	query: 'query { books { id, title, category, price, author { id, firstName, lastName } }}',
	variables: null
};

fetch('/graphql', {
	method: 'POST',
	body: JSON.stringify(req),
	headers: new Headers({ 'content-type': 'application/json' })
})
	.then(res => res.json())
	.then(({ data }) =>
		ReactDOM.render(<BookTool books={data.books} />, document.querySelector('main')));



