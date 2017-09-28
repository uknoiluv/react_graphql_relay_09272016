import Relay from 'react-relay';
import { BookTool } from '../components/book-tool';

export const BookToolContainer = Relay.createContainer(BookTool, {

	fragments: {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
				books(first: 1000) {
					edges {
						node {
							id
							title
							category
							price
						}
					}
				}
			}
		`
	}

});
