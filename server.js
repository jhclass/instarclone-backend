//agpp-setup
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import logger from 'morgan';

import {ApolloServer} from 'apollo-server-express';
import schema from './shema';
import { getUser } from './users/users.utils';

const startServer = async()=> {
    const server = new ApolloServer({
        schema,
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
