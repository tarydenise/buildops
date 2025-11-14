"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeDefs_1 = require("./graphql/typeDefs");
const resolvers_1 = require("./graphql/resolvers");
const db_1 = require("./db");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
require("./auth/google");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)(), (0, express_session_1.default)({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false }), passport_1.default.initialize(), passport_1.default.session());
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    context: ({ req }) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            try {
                const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                return { user };
            }
            catch {
                return {};
            }
        }
        return {};
    },
});
const startServer = async () => {
    await (0, db_1.connectDB)();
    await server.start();
    server.applyMiddleware({ app: app });
    app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
    app.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => {
        const user = req.user;
        const token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send(`Logged in! Your token: ${token}`);
    });
    app.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
};
startServer();
