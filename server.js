//agpp-setup
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import logger from 'morgan';
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
import {ApolloServer} from 'apollo-server-express';
import {typeDefs,resolvers} from './shema';
import { getUser } from './users/users.utils';

const startServer = async()=> {
    const server = new ApolloServer({
        typeDefs,resolvers,
        context: async ({req})=> {
            //console.log(req.headers.token)
            return {
            "loggedInUser":await getUser(req.headers.token),
            
            }
        }
    })
    await server.start();
    const app = express();
    app.use(logger('tiny'))
    server.applyMiddleware({app});
    
    
    app.listen({port:process.env.PORT},()=>{
        console.log(`http://localhost:${process.env.PORT}👌`)
    })
    
}

startServer();
