import { gql } from 'apollo-server-express';

export default gql`
  type Subscription {
    newMessage(id:Int!):Message
  }
`;