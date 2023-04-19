import { gql } from "apollo-server-express";

export default gql`
 type DeleteCommentsResult{
    ok:Boolean!
    error:String
 }
 type Mutation {
    deleteComment(id:Int!):MutationResponse!
 }
`;