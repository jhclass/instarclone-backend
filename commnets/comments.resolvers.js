import client from "../client";

export default {
  Comment: {
    isMine: ({ userId }, _, context) => {
      if (!context.loggedInUser) {
        return false;
      }
      return userId === context.loggedInUser.id;
    },
  },
};
