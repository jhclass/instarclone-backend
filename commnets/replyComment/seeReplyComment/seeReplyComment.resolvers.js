import client from "../../../client";

export default {
  Query: {
    seeReplyComment: async (_, { commentId }, context) => {
      const replyData = await client.reply.findMany({
        where: {
          commentId: commentId,
        },
      });
      if (replyData.length === 0) {
        console.log("댓글의 댓글 없음.");
        return null;
      } else {
        return replyData;
      }
    },
  },
};
