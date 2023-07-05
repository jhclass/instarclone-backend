import { gql } from "apollo-server-core";

export default gql`
  type CheckAccountResult {
    ok: Boolean!
    message: String
  }
  type Mutation {
    checkNick(nick: String!): CheckAccountResult!
    checkUser(temporaryUser: String!): CheckAccountResult!
  }
`;
