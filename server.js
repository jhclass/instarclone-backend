//agpp-setup
import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from "graphql-upload";
import express from "express";
import bodyParser from "body-parser";
import logger from 'morgan';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import schema from './shema';
import { getUser } from './users/users.utils';

const startServer = async () => {
    const apollo = new ApolloServer({
        schema,
        context: async ({ req }) => {
            //console.log(req.headers.token)
            return {
                "loggedInUser": await getUser(req.headers.token),
                "dirname": __dirname,

            }
        },
        plugins: [{
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close();
                    }
                };
            }
        }],
    })
    await apollo.start();
    const app = express();
    const httpServer = createServer(app);
    app.use(logger('tiny'))
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/uploads', express.static('uploads'));
    app.use(graphqlUploadExpress());
    apollo.applyMiddleware({ app });
    const subscriptionServer = SubscriptionServer.create({
        // This is the `schema` we just created.
        schema,
        // These are imported from `graphql`.
        execute,
        subscribe,
    }, {
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // This `server` is the instance returned from `new ApolloServer`.
        path: apollo.graphqlPath,
    });

    httpServer.listen({ port: process.env.PORT }, () => {
        console.log(`http://localhost:${process.env.PORT}👌`)
    })
}

startServer();
