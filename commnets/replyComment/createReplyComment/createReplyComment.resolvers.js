import client from "../../../client";
import { protectedResolver } from "../../../users/users.utils";
export default {
  Mutation: {
    createReplyComment: protectedResolver(
      async (_, { commentId, payload }, context) => {
        const ok = await client.comment.findUnique({
          where: {
            id: commentId,
          },
          select: {
            id: true,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "해당 댓글은 존재하지 않습니다.",
          };
        } else {
          const replyComment = await client.reply.create({
            data: {
              payload: payload,
              comment: {
                connect: {
                  id: commentId,
                },
              },
              user: {
                connect: {
                  id: context.loggedInUser.id,
                },
              },
            },
          });
          if (replyComment) {
            return {
              ok: true,
              id: replyComment.id,
            };
          }
        }
      }
    ),
  },
};
