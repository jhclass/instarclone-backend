import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query: {
        seeRoom: protectedResolver(async (_, { id }, context) => {
            const room = await client.room.findFirst({
                where: {
                    id,
                    users: {
                        some: {
                            id: context.loggedInUser.id
                        }
                    }
                },
                // include: {
                //     message: true,
                //     users: true
                // }



            })
            console.log(room)
            return room;
        })
    }
}