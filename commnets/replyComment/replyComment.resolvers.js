import client from "../../client";
export default {
  Reply: {
    user: ({ userId }) => {
      return client.user.findUnique({
        where: {
          id: userId,
        },
      });
    },
    isMine: ({ userId }, context) => {
      if (!context.loggedInUser) {
        return false;
      }
      return userId === context.loggedInUser.id;
    },
  },
};
