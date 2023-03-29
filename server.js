import dotenv from 'dotenv';
dotenv.config();
import {ApolloServer} from 'apollo-server';
import schema from './shema';


const server = new ApolloServer({
    schema
})

server.listen(process.env.PORT).then(()=>console.log(`http://localhost:${process.env.PORT}👌`))