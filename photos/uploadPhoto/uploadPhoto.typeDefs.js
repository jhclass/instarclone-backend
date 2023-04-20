import { gql } from "apollo-server-express";
export default gql`
    scalar Upload,
    type Mutation {
    
     uploadPhoto(file:Upload!,caption:String):Photo   
    }
`;
//file:String! <- test를 하기위한 임시 원래는 Upload