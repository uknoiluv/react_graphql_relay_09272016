import { authorType } from '../types/author-type';
import { connectionDefinitions } from 'graphql-relay';

export const { connectionType: authorConnection, edgeType: authorEdge } =
	connectionDefinitions({ name: 'Author', nodeType: authorType });
