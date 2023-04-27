import { gql } from "apollo-server-express";

export default gql`
 type Mutation {
    sendMessage(userId:Int payload:String! roomId:Int):MutationResponse!
 }
`;