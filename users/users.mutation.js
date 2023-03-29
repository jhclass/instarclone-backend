import client from "../client"
import bcrypt from "bcrypt"
export default {
    Mutation:{
        createAccount: async (_,{
            firstName,
            lastName,
            username,
            email,
            password,
        })=> {
            //check if username or email are already on db
            const exitingUser = await client.user.findFirst({where:{
                OR:[
                    {username},{email}
                ]
            }});
            // if(!exitingUser){
            //     throw console.error("No one");
            // }
            //hash password (use bcrypt)
            const uglyPassword = await bcrypt.hash(password,10);
            console.log(uglyPassword);
            
            //save and return the user  
           return client.user.create({data:{
            firstName,
            lastName,
            username,
            email,
            password:uglyPassword,
           }})
        // You can write it like below..
        //    const user = await client.user.create({data:{
        //     firstName,
        //     lastName,
        //     username,
        //     email,
        //     password:uglyPassword,
        //    }})

        //    return user;

        }
    }
}