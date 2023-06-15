import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    password: String!
    bio: String
    avatar: String
    createdAt: String!
    UpdatedAt: String!
    following: [User]
    follower: [User]
    totalFollowing: Int!
    totalFollower: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    photos: [Photo]
  }
`;

//isFollowing: 이 계정을 내가 팔로잉 하고 있니?
//isMe: 이 계정이 나의 계정이 맞니?
