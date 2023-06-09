import client from "../../client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default {
    Mutation:{
        login:async(_,{username,password})=>{
            //find user with args,username
            const user = await client.user.findFirst({where:{username}});
            if(!user) {
                return {
                    ok:false,
                    error:"User not found."
                    
                }
            }
            //check password with args,password
            //In compare(), the entered password is hashed and compared with the existing password.
            const passwordOk = await bcrypt.compare(password,user.password);
            console.log(passwordOk);
            if(!passwordOk){
                return {
                    ok:false,
                    error:"Incorrect password."
                }
            }
            //issue a token and send it to the user
            //random keygen (secret_key issuance)
            //jwt.io (Check token content)
            const token = await jwt.sign({id:user.id},process.env.SECRET_KEY,{ expiresIn: '14d' })
            return {ok:true,token}
    
        },
    }
    
}