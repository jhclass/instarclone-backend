import { gql } from "apollo-server-core";

export default gql`
  type createReplyCommentResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createReplyComment(
      commentId: Int!
      payload: String!
    ): createReplyCommentResult!
  }
`;
