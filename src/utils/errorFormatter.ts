import { GraphQLError, GraphQLFormattedError } from "graphql";

export const formatGraphQLError = (err: GraphQLError): GraphQLFormattedError => {
    return {
        message: err.message,
        path: err.path,
        extensions: {
            code: err.extensions?.code || 'INTERNAL_SERVER_ERROR',
            timestamp: new Date().toISOString(),
        },
    };
};
