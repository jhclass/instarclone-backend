import client from "../client"
export default {
    Room: {
        users: (parent) => {
            console.log(parent)
            return client.room.findUnique({
                where: {
                    id: parent.id
                }
            }).users()
        },
        message: (parent) => {
            return client.message.findMany({
                where: {
                    roomId: parent.id
                }
            })
        },
        unreadTotal: (parent, _, context) => {
            if (!context.loggedInUser) {
                return 0
            }
            return client.message.count({
                where: {
                    read: false,
                    roomId: parent.id,
                    user: {
                        id: {
                            not: context.loggedInUser.id,
                        }
                    }
                },

            })
        }
    },
    Message: {
        user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
        isMine: (parent, _, context) => {
            console.log(parent)
            if (parent.userId === context.loggedInUser.id) {
                return true
            } else {
                return false
            }

        }
    }
}