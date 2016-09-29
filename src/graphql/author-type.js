import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import { bookType } from './book-type';
import fetch from 'node-fetch';

export const authorType = new GraphQLObjectType({

	name: 'Author',

	fields: () => ({
		id: {
			type: GraphQLID
		},
		firstName: {
			type: GraphQLString
		},
		lastName: {
			type: GraphQLString
		},
		books: {
			type: new GraphQLList(bookType),
			resolve: ({ id: authorId }, _, { baseUrl }) =>
				fetch(`${baseUrl}/books/?authorId=${authorId}`)
					.then(res => res.json)
		}
	})

});