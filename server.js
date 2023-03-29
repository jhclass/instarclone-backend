import {ApolloServer} from 'apollo-server';
import {typeDefs,resolvers} from './shema';


const server = new ApolloServer({
    typeDefs,resolvers
})

server.listen(4000).then(()=>console.log('http://localhost:4000👌'))