import client from "../client"
export default {
    Photo: {
        user: ({ userId }) => {
            //console.log(root)
            //root 의 userId (Photo model 의 정보로 user 정보를 찾아라!)
            return client.user.findUnique({ where: { id: userId } })
        },
        hashtags: ({ id }) => {
            return client.hashtag.findMany({
                where: {
                    photos: {
                        some: {
                            id
                        }
                    }

                }
            })
        }
    }

}