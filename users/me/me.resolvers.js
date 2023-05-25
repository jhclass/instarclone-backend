import { protectedResolver } from "../users.utils";
export default {
  Query: {
    me: protectedResolver((_, __, context) => {
      return client.user.findUnique({
        where: {
          id: context.loggedInUser,
        },
      });
    }),
  },
};
