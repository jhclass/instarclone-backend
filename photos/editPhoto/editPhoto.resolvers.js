import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
export default {
    Mutation: {
        editPhoto: protectedResolver(async (_, { id, caption }, context) => {
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
            const oldPhoto = await client.photo.findUnique({
                where: { id }, //photo's id
                include: { //hashtags 처럼 불러올수 없는 것들은 include 를사용해
                    // hashtags: true, // 이걸쓰면 hashtag 내용 전체를 다 불러와 
                    hashtags: {
                        select: {
                            hashtag: true
                        }
                    }
                }
            })
            console.log(oldPhoto.hashtags)
            //포토의 userId === loggedInUser 의 아이디가 같은지
            if (oldPhoto.userId !== context.loggedInUser.id) {
                return {
                    ok: false,
                    error: "본인의 게시물만 수정할 수 있습니다."
                }

            } else {
                const ok = await client.photo.update({
                    where: {
                        id
                    }, data: {
                        caption: caption,
                        hashtags: {
                            disconnect: oldPhoto.hashtags,
                            connectOrCreate: hashtagsObj
                        }
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