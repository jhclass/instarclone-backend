import client from "../../client"

export default {
    Query: {
        //무한 스크롤 페이지가 필요할떄 사용하자
        //based cursor 로는 1p -> 34p 로 바로 갈수 없어
        seeFollowing: async (_, { username, lastId }) => {
            const ok = await client.user.findUnique({ where: { username }, select: { id: true } });
            if (!ok) {
                return {
                    ok: false,
                    error: "User not found"
                }
            }
            const following = await client.user.findUnique({ where: { username } }).following(
                {
                    take: 5,
                    skip: 1,
                    ...(lastId && { cursor: { id: lastId } }) //cursor가 정의되어있지 않을 수 있기에.
                }
            );
            return {
                ok: true,
                following: following,

            }

        }
    }
}