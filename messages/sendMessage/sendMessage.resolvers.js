import client from '../../client'
import { protectedResolver } from '../../users/users.utils'
export default {
    Mutation: {
        sendMessage: protectedResolver(async (_, { roomId, userId, payload }, context) => {
            let room = null;
            if (userId) {
                const user = await client.user.findUnique({
                    where: {
                        id: userId
                    },
                    select: {
                        id: true
                    }
                })
                if (!user) {
                    return {
                        ok: false,
                        error: "This user does not exist"
                    }
                }
                room = await client.room.create({
                    data: {
                        users: {
                            connect: [
                                { id: userId }, { id: context.loggedInUser.id }
                            ]
                        }
                    }
                })

            } else if (roomId) {
                room = await client.room.findUnique({
                    where: {
                        id: roomId,
                    },
                    select: {
                        id: true
                    }
                })
                if (!room) {
                    return {
                        ok: false,
                        error: "Room not found."
                    }
                }
            }
            await client.message.create({
                data: {
                    payload,
                    room: {
                        connect: {
                            id: room.id
                        }
                    },
                    user: {
                        connect: {
                            id: context.loggedInUser.id
                        }
                    }

                }
            })
            return {
                ok: true,

            }
        })
    }
}