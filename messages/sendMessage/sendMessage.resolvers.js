import client from '../../client'
import { protectedResolver } from '../../users/users.utils'
import pubsub from '../../pubsub';
export default {
    Mutation: {
        sendMessage: protectedResolver(async (_, { roomId, userId, payload }, context) => {
            //console.log(roomId)
            let room = null;
            if (userId && !roomId) {
                console.log('여기가 출력되나?')
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
                //console.log("출력되나요?")
                if (!room) {
                    return {
                        ok: false,
                        error: "Room not found."
                    }
                }
            }
            //console.log('룸룸룸룸', room.id)
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

            console.log(payload)
            await pubsub.publish("NEW_MESSAGE", {
                newMessage: {
                    payload,
                    myName: context.loggedInUser.username,
                    roomId,
                    userId,
                }
            });
            //return postController.createPost(payload);
            return {
                ok: true,

            }
        })
    }
}