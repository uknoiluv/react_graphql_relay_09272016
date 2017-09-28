export default class {
	constructor(author) {

		if (!author) return;

		Object.assign(this, {
			id: author.id,
			firstName: author.title,
			lastName: author.category
		});

	}
}
