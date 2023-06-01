import client from "../client";
export default {
  Photo: {
    user: ({ userId }) => {
      //console.log(root)
      //root 의 userId (Photo model 의 정보로 user 정보를 찾아라!)
      return client.user.findUnique({ where: { id: userId } });
    },
    hashtags: ({ id }) => {
      return client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      });
    },
    likes: ({ id }) => {
      //console.log(id)
      return client.like.count({ where: { photoId: id } });
      //나오긴 하지만 console.log()에는 안찍혀 (prisma promise 거든)
    },

    comments: ({ id }) => {
      return client.comment.count({
        where: { photoId: id },
      });
    },
    isMine: ({ userId }, _, context) => {
      if (!context.loggedInUser) {
        return true;
      }
      return userId === context.loggedInUser.id;
    },
    isLiked: async ({ id }, _, context) => {
      if (!context.loggedInUser) {
        return false;
      }
      const ok = await client.like.findUnique({
        where: {
          userId_photoId: {
            photoId: id,
            userId: context.loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    },
  },
};
