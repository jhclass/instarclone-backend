import client from "../../client";
import bcrypt from "bcrypt";
export default {
    Mutation:{
        createAccount: async (_,{
            firstName,
            lastName,
            username,
            email,
            password,
        })=> {
            try {
                //check if username or email are already on db
            const exitingUser = await client.user.findFirst({where:{
                OR:[
                    {username},{email}
                ]
            }});
            console.log(exitingUser)
            if(exitingUser){
                throw new Error("This usename/password is alread taken");
            }
            //hash password (use bcrypt)
            const uglyPassword = await bcrypt.hash(password,10);
            console.log(uglyPassword);
            
            //save and return the user  
           await client.user.create({data:{
            firstName,
            lastName,
            username,
            email,
            password:uglyPassword,
           }})
           return {
            ok:true,

           }
        // You can write it like below..
        //    const user = await client.user.create({data:{
        //     firstName,
        //     lastName,
        //     username,
        //     email,
        //     password:uglyPassword,
        //    }})

        //    return user;

            } catch (error) {
               return {
                ok:false,
                error:"Cant create account"
               }
            }
        },
    }
}