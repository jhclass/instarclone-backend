import { withFilter } from "graphql-subscriptions";
import pubsub from "../pubsub";
export default {
  Subscription: {

    newMessage: {
      // More on pubsub below

      subscribe:
        withFilter(
          () => pubsub.asyncIterator("NEW_MESSAGE"),
          (payload, variables) => {
            console.log(payload, variables)
            return true;


          }
        )

    },

  },
  // ...other resolvers...
}