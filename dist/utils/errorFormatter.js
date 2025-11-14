"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatGraphQLError = void 0;
const formatGraphQLError = (err) => {
    return {
        message: err.message,
        path: err.path,
        extensions: {
            code: err.extensions?.code || 'INTERNAL_SERVER_ERROR',
            timestamp: new Date().toISOString(),
        },
    };
};
exports.formatGraphQLError = formatGraphQLError;
