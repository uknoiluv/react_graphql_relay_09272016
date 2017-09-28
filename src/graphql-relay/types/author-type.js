import { GraphQLObjectType, GraphQLID, connectionArgs, GraphQLString, GraphQLList } from 'graphql';
import { globalIdField, connectionFromPromisedArray } from 'graphql-relay';
import { nodeInterface } from '../../relay-utils/node-definitions';
import { registerType } from '../../relay-utils/resolve-type';
import { bookType } from './book-type';
import { getAllResources } from '../resources';
import { bookConnection } from '../connections/book-connection';
import Author from '../../relay-models/author';

export const authorType = new GraphQLObjectType({

	name: 'Author',

	fields: () => ({
		id: globalIdField('Author'),
		firstName:	 {
			type: GraphQLString
		},
		lastName: {
			type: GraphQLString
		},
		books: {
			type: bookConnection,
			description: 'A list of books',
			args: connectionArgs,
			resolve: (_, args, { baseUrl }) =>
				connectionFromPromisedArray(getAllResources(baseUrl, 'books'), args)
		}
	}),

	interfaces: [nodeInterface]

});

registerType(Author, authorType, id => getResource('http://localhost:3010','authors', id));
