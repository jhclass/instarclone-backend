import { protectedResolver } from "../users.utils";
import client from "../../client";
export default {
  Query: {
    me: protectedResolver(async (_, __, context) => {
      const iamuser = await client.user.findUnique({
        where: {
          id: context.loggedInUser,
        },
      });
      console.log(iamuser);
      return iamuser;
    }),
  },
};
