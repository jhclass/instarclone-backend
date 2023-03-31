import client from "../../client"
import bcypt from "bcrypt"
export default {
    Mutation:{
        //update Pofile
        //first. First of all, proceed under the premise that the id is known. 
        //second. When changing a password, it is hashed and updated.

        editProfile:async(_,{
            firstName,
            lastName,
            username,
            email,
            password:newPassword,
        })=> {
            let uglyPassword = null;
            if (newPassword) {
                uglyPassword = await bcypt.hash(newPassword,10)
            }
            //console.log(newPassword)
            //console.log(uglyPassword)
            const ok = await client.user.update({
                where:{
                    id:1,
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