import client from "../../client";
export default {
    Query:{
        seeProfile: async (_,{username})=>{
            //findUnique : find @unique in User model
         const findUser = await client.user.findUnique({
            where:{username:username},
            include:{
                following:true,
                follower:true
            }
        });
         console.log(findUser.createdAt);
         return findUser;
        
        }
    }
}