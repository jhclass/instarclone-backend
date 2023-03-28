import {ApolloServer,gql} from 'apollo-server';

const typeDefs = gql`
    type Movie {
        title:String
        year:Int
    }
    type Query {
        movies: [Movie]
        movie:Movie

    }
    type CreateResult {
        ok:Boolean
        error:String
    }
    type Mutation {
        createMovie(title:String!):CreateResult
        deleteMovie(title:String!):Boolean
    }
    
`;
const resolvers = {
    Query: {
        movies: ()=>[],
        movie: ()=>({"title":"hello","year":2021})
    },
    Mutation: {
        createMovie:(_,{title})=>{
            console.log(title);
            return {
                ok:true
            }
        },
        deleteMovie:(_,{title})=> {
            console.log(title);
             return true;
        }
    }

}

const server = new ApolloServer({
    typeDefs,resolvers
})

server.listen(4000).then(()=>console.log('http://localhost:4000👌'))