import { gql} from "apollo-server";
import client from './client';

export const typeDefs = gql`
    type Movie {
        id:Int!
        title:String!
        year:Int!
        gener:String
        createdAt:String!
        updatedAt:String!
    }
    type Query {
        movies: [Movie]
        movie(id: Int!): Movie

    }
    type CreateResult {
        ok:Boolean
        error:String
    }
    type Mutation {
        createMovie(title: String!, year: Int!, genre: String): Movie
        deleteMovie(id:Int!):CreateResult
    }
    
`;
export const resolvers = {
    Query: {
        movies: ()=>client.movie.findMany(),
        movie: (_, { id }) => client.movie.findUnique({where:{id:id}}),
    },
    Mutation: {
        createMovie:(_,{title,year,gener})=>{
            //console.log('create',title,year,gener);
            return client.movie.create({data:{title,year,gener}})
            
        },
        deleteMovie:async(_,{id})=> {
            //console.log('del',title,year,gener);
            console.log(id)
            const row = await client.movie.findUnique({
                where: {
                  id: id,
                },
              })
              console.log(id)
              
            console.log(row);
            if(!row){
                
                 throw console.error("없어영");
            }
            return client.movie.delete({where:{id:id}})
            
            
        }
    }

}

