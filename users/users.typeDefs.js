import { gql } from "apollo-server";
export default gql`
    type User {
        id: Int! 
        firstName: String!
        lastName: String
        username: String! 
        email: String!
        password: String!
        createdAt: String!
        UpdatedAt: String!
    }
    type Mutation {
        createAccount(
            firstName:String!
            lastName: String
            username: String! 
            email: String!
            password: String!
        ):User
    }
    type Query {
        seeProfile(
            username: String! 
        ):User
    }

`;