import { gql } from "apollo-server-express";

export default gql `
    type seeFollowsResult {
        ok: Boolean!
        error: String
        follower: [User]
        totalPages: Int
        
    }
    type Query{
        seeFollows(username:String!,page:Int!):seeFollowsResult!
    }
`;