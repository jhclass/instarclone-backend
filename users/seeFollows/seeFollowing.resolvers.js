import client from "../../client"

export default {
    Query:{
        seeFollowing: async(_,{username,lastId})=>{
            const ok = await client.user.findUnique({where:{username},select:{id:true}});
            if (!ok) {
                return {
                    ok:false,
                    error:"User not found"
                }
            }
            const following = await client.user.findUnique({where:{username}}).following(
                {
                    take:5,
                    skip:1,
                    ...(lastId&&{cursor:{id:lastId}}) //cursor가 정의되어있지 않을 수 있기에.
                }
            );
            return {
                ok:true,
                following:following,
            }

        }
    }
}