import {
	GraphQLObjectType, GraphQLString,
	GraphQLID, GraphQLInt
} from 'graphql';
import { ownerType } from './owner-type';
const fetch = require('node-fetch');

export const widgetType = new GraphQLObjectType({

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
			resolve: ({ ownerId }, _, { baseUrl }) => {
				return fetch(`${baseUrl}/owners/${ownerId}`)
					.then(res => res.json());
			}
		}
	})

});