import { withFilter } from "graphql-subscriptions";
import pubsub from "../pubsub";
import client from "../client";

export default {
  Subscription: {
    newMessage: {
      subscribe: async (root, args, context, info) => {
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: {
              some: {
                id: context.loggedInUser.id
              }
            }
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
          async (payload, variables, context) => {

            console.log(context.loggedInUser.id)
            if (payload.newMessage.roomId === variables.id) {

              const room = await client.room.findFirst({
                where: {
                  id: variables.id,
                  users: {
                    some: {
                      id: context.loggedInUser.id
                    }
                  }
                },
                select: {
                  id: true,
                },
              });
              console.log("여기까진 왔어?", room)
              if (!room) {

                return false;
              } else {
                //console.log("여기야?")
                return true;
              }

            }
          }
        )(root, args, context, info);
      },
    },
  },
};