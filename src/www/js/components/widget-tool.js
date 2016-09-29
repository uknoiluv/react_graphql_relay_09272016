import React, { Component, PropTypes } from 'react';

export class WidgetTool extends Component {

	static propTypes = {
		viewer: PropTypes.shape({
			widgets: PropTypes.shape({
				edges: PropTypes.array
			})
		})
	}

	render() {

		const edges = this.props.viewer.widgets.edges;

		return <div>
			<h1>Widget Tool</h1>
			<ul>
				{edges.map(edge => <li key={edge.node.id}>{edge.node.name}</li>)}
			</ul>
		</div>;
	}
}