import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { deleteToS3 } from "../../shared/shared.utils";

export default {
    Mutation: {
        deletePhoto: protectedResolver(async (_, { id }, context) => {
            const photo = await client.photo.findUnique(
                {
                    where: {
                        id
                    },
                    select: {
                        userId: true,
                        file: true,
                    }
                },


            )//end of findUnique()
            console.log('지워져야할 사진', photo.file)
            if (!photo) {
                return {
                    ok: false,
                    error: "photo not found"
                }
            } else if (photo.userId !== context.loggedInUser.id) {
                return {
                    ok: false,
                    error: "Not authorized"
                }
            } else {
                await client.photo.delete({
                    where: {
                        id
                    }
                })//end of delete()
                await deleteToS3(photo.file, "uploads")
                return {
                    ok: true,
                    error: null

                }

            }

        })
    }
}