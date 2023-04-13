import { gql } from "apollo-server-express";

export default gql`
    type EditPhotoResult {
        ok:Boolean!
        error:String
        changes:String
    }
    type Mutation {
        editPhoto(id:Int!,caption:String!):EditPhotoResult!
    }
`;

//인스타에서는 캡션만 수정이 가능하지