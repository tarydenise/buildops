import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { connecDB } from './db';

dotenv.config();
const app = express();
app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => ({
        message: err.message,
        path: err.path,
        code: err.extensions.code || 'INTERNAL_SERVER_ERROR',
    }),
});

const startServer = async () => {
    await connecDB();
    await server.start();
    server.applyMiddleware({ app: app as any });

    app.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
};

startServer();