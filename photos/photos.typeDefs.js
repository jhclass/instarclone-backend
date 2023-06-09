import { gql } from "apollo-server-express";
export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    likes: Int!
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    commentNumber: Int!
    comments: [Comment]
    totalComments: Int
    isLiked: Boolean!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(lastId: Int): [Photo]
    totalPhotos: Int
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    user: User!
    createdAt: String!
    UpdatedAt: String!
  }
`;
