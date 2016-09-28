import { GraphQLObjectType, GraphQLInputObjectType,
	GraphQLString, GraphQLInt } from 'graphql';

/*

mutation insertWidget($newWidget: InsertWidget) { 

	insertWidget(widget: $newWidget) {
    id
    name
    color
  }


}

{
  "newWidget": {
  	"name": "Alex", "color": "orange", "size": "medium",
    "description": "Alex is a nice and kind person.", "quantity": 12
  }
}

*/


import { widgetType } from './widget-type';
const fetch = require('node-fetch');

export const insertWidgetType = new GraphQLInputObjectType({

	name: 'InsertWidget',

	fields: () => ({
		name: {
			type: GraphQLString
		},
		description: {
			type: GraphQLString
		},
		color: {
			type: GraphQLString
		},
		size: {
			type: GraphQLString
		},
		quantity: {
			type: GraphQLInt
		}
	})

});

export const mutationType = new GraphQLObjectType({

	name: 'Mutation',
	description: 'Modifies data on the server.',
	fields: () => ({

		insertWidget: {
			type: widgetType,
			args: {
				widget: {
					type: insertWidgetType
				}
			},
			resolve: (_, { widget }) => {

				return fetch('http://localhost:3010/widgets', {
					method: 'post',
					headers: { 'content-type': 'application/json'},
					body: JSON.stringify(widget)
				}).then(res => res.json());

			}
		}

	})

});