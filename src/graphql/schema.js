import { GraphQLSchema } from 'graphql';
import { queryType as query } from './query-type';

export const schema = new GraphQLSchema({ query });