import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
export default {
    Mutation: {
        editPhoto: protectedResolver(async (_, { id, caption }, context) => {
            const photo = await client.photo.findUnique({
                where: { id }, //photo's id
            })
            console.log(photo)
            //포토의 userId === loggedInUser 의 아이디가 같은지
            if (photo.userId !== context.loggedInUser.id) {
                return {
                    ok: false,
                    error: "본인의 게시물만 수정할 수 있습니다."
                }

            } else {
                const ok = await client.photo.update({
                    where: {
                        id
                    }, data: {
                        caption: caption
                    }
                })
                if (ok) {
                    return {
                        ok: true,
                        changes: caption
                    }
                }
            }
            //같다면 해시태그 수정
            //같지 않으면 false, error message 리턴.
        })
    }
}