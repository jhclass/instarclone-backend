import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        deleteMessage: protectedResolver(async (_, { id }, context) => {
            // 로그인한 사용자와 글의 사용자 아이디와 같은지 체크한다.
            const userId = await client.message.findUnique({
                where: {
                    id,

                },
                select: {
                    userId: true
                }
            })
            //console.log(userId)
            if (userId.userId === context.loggedInUser.id) {
                await client.message.delete({
                    where: {
                        id
                    }

                })
                return {
                    ok: true
                }
            } else {
                return {
                    ok: false,
                    error: "It's not what you wrote"
                }
            }
        })
    }
}