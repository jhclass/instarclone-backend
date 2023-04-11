import { gql } from "apollo-server-express";
export default gql`
type Photo {
    id:String!
    user:User!
    file:String!
    caption:String
    hashTag:[Hashtag]
    createdAt:String!
    updatedAt:String!
}
type Hashtag {
    id:String!
    hashtag:String!
    photos:[Photo]
    createdAt:String!
    updatedAt:String!

}
`;