import { gql } from "apollo-server-express";
export default gql`
  type Message {
    id: Int !
    payload: String!
    user: User! 
    room: Room!
    userId: Int!
    roomId: Int!
    createdAt: String!
    updatedAt: String!
    isMine:Boolean!
  }
  
  type Room {
    id: Int!
    unreadTotal:Int!
    users: [User]
    message: [Message]
    userId: Int!
    createdAt: String!
    updatedAt: String!
  }
`;