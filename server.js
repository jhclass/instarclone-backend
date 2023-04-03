//agpp-setup
import dotenv from 'dotenv';
dotenv.config();
import {ApolloServer} from 'apollo-server';
import schema from './shema';
import { getUser,protectResolver } from './users/users.utils';


const server = new ApolloServer({
    schema,
    context: async ({req})=> {
        //console.log(req.headers.token)
        return {
        "loggedInUser":await getUser(req.headers.token),
        protectResolver,
        }
    }
})

server.listen(process.env.PORT).then(()=>console.log(`http://localhost:${process.env.PORT}👌`))
