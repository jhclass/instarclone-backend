import client from "../client"
import photosResolvers from "./photos.resolvers";
export default {
    Hashtag: {
        totalPhotos: async ({ id }) => {
            console.log(id)
            //좋은 방법이 아님
            // const photos = await client.hashtag.findUnique({
            //     where: {
            //         id
            //     }
            // }).photos()
            // console.log(photos.length);
            // return photos.length

            //더 좋은 방법을 말해주지
            const photos = await client.photo.count({
                where: {
                    hashtags: {
                        some: {
                            id,
                        }
                    }
                }
            })
            console.log(photos)
            return photos
        }
    }
}