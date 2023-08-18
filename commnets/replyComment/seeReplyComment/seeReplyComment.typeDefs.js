import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeReplyComment(commentId: Int!): [Reply]
  }
`;
