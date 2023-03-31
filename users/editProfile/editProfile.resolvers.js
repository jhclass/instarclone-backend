import client from "../../client"
import bcypt from "bcrypt"
import jwt from "jsonwebtoken"
export default {
    Mutation:{
        //update Pofile
        //first. First of all, proceed under the premise that the id is known. 
        //second. When changing a password, it is hashed and updated.
        //add option : Do have token or not. Maybe this is real first better than others. 
        
        editProfile:async(_,{
            firstName,
            lastName,
            username,
            email,
            password:newPassword,
            
        },context)=> {
            //console.log('token:',token) 
            const token = context.token;
            const verifiedId = jwt.verify(token,process.env.SECRET_KEY)
            console.log(verifiedId)
            let uglyPassword = null;
            if (newPassword) {
                uglyPassword = await bcypt.hash(newPassword,10)
            }
            //console.log(newPassword)
            //console.log(uglyPassword)
            const ok = await client.user.update({
                where:{
                    id:verifiedId.id,
                },
                data:{
                    firstName,
                    lastName,
                    username,
                    email,
                    ...(newPassword&&{password:uglyPassword})
                },
            })
            if(ok){
                return {
                    ok:true
                }
            }else{
                return {
                    ok:false,
                    error:"Counld not edit profile."
                }
            }
        }
    }
}