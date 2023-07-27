import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver((_, { offset }, context) => {
      //_ no! , __ yes!
      //if i following to which users,  i can see field of them
      // First, Find a users that i following
      // Second, Find a photo of them
      // third, Return using reseolver

      return client.photo.findMany({
        take: 5,
        skip: offset,
        where: {
          OR: [
            {
              user: {
                follower: {
                  //follower 목록에 내 아이디가 있는 유저만 다 찾아낸다.
                  some: {
                    id: context.loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: context.loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: "desc", //최신것부터 보고싶어
        },
      });
    }),
  },
};
