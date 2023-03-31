//agpp-setup
import dotenv from 'dotenv';
dotenv.config();
import {ApolloServer} from 'apollo-server';
import schema from './shema';


const server = new ApolloServer({
    schema,
    context: {
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgwMjM2ODU3LCJleHAiOjE2ODE0NDY0NTd9.IO2CftSB9Bjif_EspBWOM0ud601SNWAexjAeYoasvkc"
    }
})

server.listen(process.env.PORT).then(()=>console.log(`http://localhost:${process.env.PORT}👌`))
