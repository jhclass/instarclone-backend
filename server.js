//agpp-setup
import dotenv from 'dotenv';
dotenv.config();
import {ApolloServer} from 'apollo-server';
import schema from './shema';


const server = new ApolloServer({
    schema,
    context: ({req})=> {
        //console.log(req.headers.token)
        return {
        "token":req.headers.token
        }
    }
})

server.listen(process.env.PORT).then(()=>console.log(`http://localhost:${process.env.PORT}👌`))
