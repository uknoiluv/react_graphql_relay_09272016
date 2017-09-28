import React from 'react';

export class BookTool extends React.Component {

	render() {

		return <ul>
			{this.props.viewer.books.edges.map(edge => <li>Title : {edge.node.title}, Price: {edge.node.price}, Category: {edge.node.category} </li>)}
		</ul>;
	}
}
