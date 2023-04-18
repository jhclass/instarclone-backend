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
        },
        likes: ({ id }) => {
            //console.log(id)
            return client.like.count({ where: { photoId: id } })
            //나오긴 하지만 console.log()에는 안찍혀 (prisma promise 거든)
        },
        comments: async ({ id }) => {
            const comments = await client.comment.findMany({
                where: {
                    photoId: id

                }

            })
            const commentArray = comments.map(comment => comment.payload);
            console.log(commentArray);
            return commentArray

        },
        totalComments: ({ id }) => {
            return client.comment.count({
                where: { photoId: id }
            })
        }
    }
}