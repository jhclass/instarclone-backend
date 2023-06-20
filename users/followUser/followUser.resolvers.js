import { protectedResolver } from "../users.utils";
import client from "../../client";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, context) => {
      const ok = await client.user.findUnique({ where: { username } });
      if (!ok) {
        return {
          ok: false,
          error: "That user does not exist",
        };
      }
      await client.user.update({
        where: { id: context.loggedInUser.id },
        data: {
          following: {
            connect: {
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
