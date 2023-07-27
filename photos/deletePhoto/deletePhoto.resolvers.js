import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { deleteToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, context) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
          file: true,
        },
      }); //end of findUnique()
      console.log("지워져야할 사진", photo.file);
      if (!photo) {
        return {
          ok: false,
          error: "photo not found",
        };
      } else if (photo.userId !== context.loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized",
        };
      } else {
        // 좋아요 레코드 삭제
        await client.like.deleteMany({
          where: {
            photo: { id },
          },
        });

        // 댓글 레코드 삭제
        await client.comment.deleteMany({
          where: {
            photo: { id },
          },
        });
        await client.photo.delete({
          where: {
            id,
          },
        }); //end of delete()
        await deleteToS3(photo.file, "uploads");
        return {
          ok: true,
          error: null,
        };
      }
    }),
  },
};
