import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
export default {
  Mutation: {
    unfollowUser: protectedResolver(async (_, { username }, context) => {
      const ok = await client.user.findUnique({ where: { username } });
      if (!ok) {
        return {
          ok: false,
          error: "That user does not exist",
        };
      }
      await client.user.update({
        where: {
          id: context.loggedInUser.id,
        },
        data: {
          following: {
            disconnect: {
              username: username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
