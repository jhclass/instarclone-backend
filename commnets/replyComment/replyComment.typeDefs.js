import { gql } from "apollo-server-core";

export default gql`
  type Reply {
    id: Int!
    user: User!
    userId: Int!
    comment: String!
    commentId: Int!
    payload: String!
    createdAt: String!
    updatedAt: String!
  }
`;
