import client from "../client";

export default {
  Comment: {
    isMine: ({ userId }, _, context) => {
      if (!context.loggedInUser) {
        return false;
      }
      return userId === context.loggedInUser.id;
    },
    user: ({ userId }) => {
      return client.user.findUnique({
        where: {
          id: userId,
        },
      });
    },
    replies: ({ id }) => {
      return client.reply.findMany({
        where: {
          commentId: id,
        },
      });
    },
  },
};
