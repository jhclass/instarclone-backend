import { withFilter } from "graphql-subscriptions";
import pubsub from "../pubsub";
import client from "../client";

export default {
  Subscription: {
    newMessage: {
      subscribe: async (root, args, context, info) => {
        const room = await client.room.findUnique({
          where: {
            id: args.id,
          },
          select: {
            id: true,
          },
        });
        if (!room) {
          //console.log("룸없음!")
          throw new Error("Room not found.");
        }
        return withFilter(
          () => pubsub.asyncIterator("NEW_MESSAGE"),
          (payload, variables) => {
            return payload.newMessage.roomId === variables.id;
          }
        )(root, args, context, info);
      },
    },
  },
};