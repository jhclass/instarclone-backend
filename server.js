import {ApolloServer} from 'apollo-server';
import schema from './shema';


const server = new ApolloServer({
    schema
})

server.listen(4000).then(()=>console.log('http://localhost:4000👌'))