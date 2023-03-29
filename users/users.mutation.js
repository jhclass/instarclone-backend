import client from "../client"
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
            if(!exitingUser){
                throw console.error("No one");
            }
            //hash password (use bcrypt)
            //save and return the user  

        }
    }
}