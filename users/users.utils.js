import jwt from "jsonwebtoken"
import client from "../client";
export const getUser = async (token)=> {
   
    try {
        if(!token){
            return null
        }
        const verifiedId = await jwt.verify(token,process.env.SECRET_KEY)
        const user = await client.user.findUnique({where:{id:verifiedId.id}})
        //console.log('user',user)
        if (user) {
            return user;
        }else {
            return null;
        }
    } catch {
        
        return null;
    }
    
}


//protected Resolvers
export const protectResolver = (user)=> {
    console.log('a',user) // user 제대로 들어왔어?
    if(!user){
        throw new Error("You need to login");
    }
}