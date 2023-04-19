import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        deleteComment: protectedResolver(async (_, { id }, context) => {

            const comment = await client.comment.findUnique({
                where: {
                    id
                },
                select: {
                    userId: true
                }
            })//end of findUnique()
            console.log(comment)
            if (!comment) {
                return {
                    ok: false,
                    error: "Comment not found"
                }
            } else if (comment.userId !== context.loggedInUser.id) {
                return {
                    ok: false,
                    error: "Comment and LoggedInUser aren't same."
                }
            } else {
                await client.comment.delete({
                    where: {
                        id
                    }
                })
                return {
                    ok: true,
                }
            }
        })
    }
}