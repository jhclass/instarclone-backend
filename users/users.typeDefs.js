import { gql } from "apollo-server-express";

export default gql`
    type User {
        id: Int! 
        firstName: String!
        lastName: String
        username: String! 
        email: String!
        password: String!
        bio:String
        avatar:String
        createdAt: String!
        UpdatedAt: String!
        following: [User]
        follower: [User]
        totalFollowing:Int!
        totalFollower:Int!
      
        }
`;

//isFollowing:Boolean
//isMe:Boolean