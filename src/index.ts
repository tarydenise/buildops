import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { connectDB } from './db';
import passport from 'passport';
import session from 'express-session';
import './auth/google';
import { formatGraphQLError } from './utils/errorFormatter';
import jwt from 'jsonwebtoken';
import { IUser } from './models/User';

dotenv.config();
const app = express();
app.use(
    cors(),
    session({ secret: process.env.JWT_SECRET!, resave: false, saveUninitialized: false }),
    passport.initialize(),
    passport.session()
);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET!);
                return { user };
            } catch {
                return{};
            }
        }
        return {};
    },
});

const startServer = async () => {
    await connectDB();
    await server.start();
    server.applyMiddleware({ app: app as any });

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get(
        '/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        (req, res) => {
            const user = req.user as IUser;

            const token = jwt.sign(
                { id: user._id, name: user.name, email: user.email },
                process.env.JWT_SECRET!,
                { expiresIn: '1h' }
            );

            res.send(`Logged in! Your token: ${token}`);
        }
    );

    app.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
};

startServer();