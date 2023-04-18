import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        deletePhoto: protectedResolver(async (_, { id }, context) => {
            const photo = await client.photo.findUnique(
                {
                    where: {
                        id
                    },
                    select: {
                        userId: true
                    }
                },


            )//end of findUnique()
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
                return {
                    ok: true,
                    error: null

                }

            }

        })
    }
}