import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        readMessage: protectedResolver(async (_, { id }, context) => {
            const message = await client.message.findFirst({
                where: {
                    id,
                    userId: {
                        not: context.loggedInUser.id
                    },
                    room: {
                        users: {
                            some: {
                                id: context.loggedInUser.id
                            }
                        }
                    }
                },
                select: {
                    id: true
                }
            })
            if (!message) {
                return {
                    ok: false,
                    error: "Message not found"
                }
            }
            await client.message.update({
                where: {
                    id
                },
                data: {
                    read: true
                }
            })
            return {
                ok: true
            }
        })

    }
}