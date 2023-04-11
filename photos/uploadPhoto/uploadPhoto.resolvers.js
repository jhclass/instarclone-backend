import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { GraphQLUpload } from "graphql-upload";

export default {
    Upload: GraphQLUpload,
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_, { file, caption }) => {
                if (caption) {
                    //parse caption
                    //get or created

                }
                //save the photo width the parsed hashtags
                //add the photo to the hashtags
            }
        )
    }
}
