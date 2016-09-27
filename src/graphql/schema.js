import {
	GraphQLSchema, GraphQLObjectType, GraphQLString,
	GraphQLID, GraphQLList, GraphQLFloat, GraphQLInt, GraphQLBoolean
} from 'graphql';
const fetch = require('node-fetch');

const ownerType = new GraphQLObjectType({

	name: 'Owner',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		widgets: {
			type: new GraphQLList(widgetType),
			resolve: ({ id: ownerId }, _, { baseUrl }) => 
				fetch(`${baseUrl}/widgets`)
					.then(res => res.json())
					.then(widgets => widgets.filter(w => w.ownerId === ownerId))
		}
	})

});

const widgetType = new GraphQLObjectType({

	name: 'Widget',
	description: 'A widget.',
	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'Id of the widget.'
		},
		name: {
			type: GraphQLString
		},
		color: {
			type: GraphQLString
		},
		size: {
			type: GraphQLString,
		},
		quantity: {
			type: GraphQLInt
		},
		owner: {
			type: ownerType,
			resolve: ({ ownerId }) => {
				return fetch(`http://localhost:3010/owners/${ownerId}`)
					.then(res => res.json());
			}
		}
	})

});

const query = new GraphQLObjectType({

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

export const schema = new GraphQLSchema({ query });