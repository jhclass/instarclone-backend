import client from "../client"

export default {

    Hashtag: {
        photos: ({ id }, { lastId }) => {
            // cursor pagination
            console.log(lastId)
            return client.hashtag.findUnique({

                where: {
                    id
                }
            }).photos(
                {
                    take: 5,
                    skip: 1,
                    ...(lastId && { cursor: { id: lastId } }) //cursor가 정의되어있지 않을 수 있기에.
                }
            )

        },
        totalPhotos: async ({ id }) => {
            //console.log(id)
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
            //console.log(photos)
            return photos
        }
    }
}