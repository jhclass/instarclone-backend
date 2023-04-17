import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        toggleLike: protectedResolver(async (_, { id }, context) => {
            //  user 1 => photo 1 , like 1
            const photo = await client.photo.findUnique({
                where: {
                    id: id
                }
            })
            if (!photo) { //photo exist here?
                return {
                    ok: false,
                    error: "This photo doesn't exist."
                }
            }
            //'like' exist here?
            const likeWhere = {
                userId_photoId: { //순서 중요하다 . 스키마에 모델에 unique 설정 잘 봐.
                    userId: context.loggedInUser.id,
                    photoId: id
                }
            }
            const like = await client.like.findUnique({
                where: likeWhere
            })
            if (like) { //true? delete now
                await client.like.delete({
                    where: likeWhere,
                    //data disconnect

                })
            } else { // false create now and connect model
                await client.like.create({
                    data: {
                        user: {
                            connect: {
                                id: context.loggedInUser.id
                            },

                        },
                        photo: {
                            connect: {
                                id: context.loggedInUser.id
                            }
                        }
                    }
                })
                return {
                    ok: true,
                }
            }
        })
    }
}