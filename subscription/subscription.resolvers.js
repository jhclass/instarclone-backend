import pubsub from "../pubsub";
export default {
  Subscription: {
       
        newMessage: {
          // More on pubsub below
          subscribe: () => pubsub.asyncIterator("NEW_MESSAGE"),
        },
        
      },
      // ...other resolvers...
}