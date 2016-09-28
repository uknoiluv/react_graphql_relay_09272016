import {
	GraphQLObjectType, GraphQLString,
	GraphQLList, GraphQLInt
} from 'graphql';
import { widgetType } from './widget-type';
const fetch = require('node-fetch');

export const queryType = new GraphQLObjectType({

	name: 'Query',
	description: 'A query operation for our GraphQL server.',
	fields: {

		message: {
			type: GraphQLString,
			description: 'A kind message of hope and love.',
			resolve: () => 'Have a nice day.'
		},

		widgets: {
			type: new GraphQLList(widgetType),
			resolve: () =>
				fetch('http://localhost:3010/widgets')
					.then(res => res.json())
		},

		widget: {
			type: widgetType,
			args: {
				id: {
					type: GraphQLInt
				}
			},
			resolve: (_, { id: widgetId }) => 
				fetch(`http://localhost:3010/widgets/${widgetId}`)
					.then(res => res.json())			
		}

	}

});