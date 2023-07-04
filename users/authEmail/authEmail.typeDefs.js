import { gql } from "apollo-server-core";

export default gql`
  type AuthEmailResult {
    ok: Boolean!
    error: String
    message: String!
    code: Int
  }
  type Mutation {
    authEmail(emailAdd: String!): AuthEmailResult
  }
`;
