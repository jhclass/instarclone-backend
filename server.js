import {ApolloServer,gql} from 'apollo-server';

const typeDefs = gql`
    type Query {
        hello: String

    }
    
`;
const resolvers = {
    Query: {
        hello: ()=> {return "baby"}
    }
}

const server = new ApolloServer({
    typeDefs,resolvers
})

server.listen(4000).then(()=>console.log('http://localhost:4000👌'))