import client from "../../client";
import { protectedResolver } from "../users.utils";
export default {
    Query: {
        seeProfile: protectedResolver(
            async (_, { username }) => {
                //findUnique : find @unique in User model
                const findUser = await client.user.findUnique({
                    where: { username: username },
                    include: {
                        following: true,
                        follower: true
                    }
                });
                console.log(findUser.createdAt);
                return findUser;

            }
        )

    }
}