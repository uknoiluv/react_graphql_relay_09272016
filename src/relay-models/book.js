export default class {
	constructor(book) {

		if (!book) return;

		Object.assign(this, {
			id: book.id,
			title: book.title,
			category: book.category,
			price: book.price
		});

	}
}
