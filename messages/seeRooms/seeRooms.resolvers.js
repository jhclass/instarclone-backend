import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query: {
        seeRooms: protectedResolver(
            async (_, __, context) => {
                console.log(context)
                return client.room.findMany(
                    {
                        where: {
                            users: {
                                some: {
                                    id: context.loggedInUser.id
                                }
                            }
                        },

                    }
                )
            }
        )
    }
}