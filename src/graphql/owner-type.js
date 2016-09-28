import {
	GraphQLObjectType, GraphQLString,
	GraphQLID, GraphQLList
} from 'graphql';
import { widgetType } from './widget-type';
const fetch = require('node-fetch');

export const ownerType = new GraphQLObjectType({

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