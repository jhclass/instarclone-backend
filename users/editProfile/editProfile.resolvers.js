import client from "../../client"
import bcypt from "bcrypt"
import jwt from "jsonwebtoken"
export default {
    Mutation:{
        //update Pofile
        //first. First of all, proceed under the premise that the id is known. 
        //second. When changing a password, it is hashed and updated.
        //add option 1 : Do have token or not. Maybe this is real first better than others. 
        //add option 2 : if you send a user, not a token.
        editProfile:async(_,{
            firstName,
            lastName,
            username,
            email,
            password:newPassword,
            
        },{loggedInUser})=> {
            //console.log('token:',token) // context => {token}
            
            console.log('a',loggedInUser)
            
            let uglyPassword = null;
            if (newPassword) {
                uglyPassword = await bcypt.hash(newPassword,10)
            }
            //console.log(newPassword)
            //console.log(uglyPassword)
            const ok = await client.user.update({
                where:{
                    id:loggedInUser.id,
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