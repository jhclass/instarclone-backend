import client from "../client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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

            } catch (error) {
                return error;
            }
        },
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

        }
    }
}