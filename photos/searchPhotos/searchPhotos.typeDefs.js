import { gql } from "apollo-server-express";

export default gql`
 type Query {
    searchPhotos(keyword:String!):[Photo]
 }
`;

//한장만 검색될것이 아니죠, [] 안에