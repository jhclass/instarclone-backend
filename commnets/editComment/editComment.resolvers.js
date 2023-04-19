import client from "../../client"
import { protectedResolver } from "../../users/users.utils"
export default {
    Mutation: {
        editComment: protectedResolver(
            async (_, { id, payload }, context) => {
                //id,palyload
                const comment = await client.comment.findUnique({
                    where: { id },
                    select: {
                        userId: true
                    }
                })
                console.log(comment)
                if (!comment) {
                    return {
                        ok: false,
                        error: "Comment not found"
                    }
                } else if (comment.userId !== context.loggedInUser.id) {
                    return {
                        ok: false,
                        error: "Not Authorized"
                    }
                } else {
                    await client.comment.update({
                        where: { id },
                        data: {
                            payload: payload
                        }

                    })
                    return {
                        ok: true,
                        error: null
                    }
                }

            }
        )
    }
}