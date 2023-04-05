//agpp-setup
import dotenv from 'dotenv';
dotenv.config();
import {ApolloServer} from 'apollo-server-express';
import { graphqlUploadExpress } from "graphql-upload";
import express from "express";
import bodyParser from "body-parser";
import logger from 'morgan';


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
    //app.use(logger('tiny'))
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(graphqlUploadExpress());
    server.applyMiddleware({app});
    
    
    app.listen({port:process.env.PORT},()=>{
        console.log(`http://localhost:${process.env.PORT}👌`)
    })
    
}

startServer();
