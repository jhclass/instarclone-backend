import { gql } from "apollo-server";
export default gql`
    scalar Upload
    type EditProfileResult {
        ok:Boolean!
        error:String
    }
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
      }
    
      type Query {
        uploads: [File]
      }
        type Mutation {
            editProfile(
                firstName:String
                lastName: String
                username: String
                email: String
                password: String
                bio: String
                
            ):EditProfileResult
            singleUpload(avatar: Upload!): File!
        }
    

`;