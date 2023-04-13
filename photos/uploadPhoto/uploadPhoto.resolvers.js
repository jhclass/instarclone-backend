import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { GraphQLUpload } from "graphql-upload";
import { hashtagsExtraction } from "../photos.utils";

export default {
    Upload: GraphQLUpload,
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_, { file, caption }, { loggedInUser }) => {
                //parse caption
                //get or created
                //protectResolver() 때문에 로그인 안하면 이 함수는 return 조차 안해 
                let hashtagsObj = []

                if (caption) {

                    const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g)
                    //console.log('has', hashtags)
                    hashtagsObj = hashtags.map(hashtag => ({
                        where: { hashtag },
                        create: { hashtag }
                    })
                    )
                    //console.log(hashtagsObj)
                }

                return client.photo.create({

                    data: {

                        file,
                        caption,
                        user: {
                            connect: {
                                id: loggedInUser.id
                            }
                        },
                        ...(hashtagsObj.length > 0 && {
                            hashtags: {
                                //hashtag 가 있는 곳을 찾아감 Model hashtag
                                //확실한건 Photo 에 있는 hashtags는 아니라는 것
                                connectOrCreate: hashtagsObj
                            }
                        })
                    }
                })


                //save the photo width the parsed hashtags
                //add the photo to the hashtags
            }
        )
    }
}
