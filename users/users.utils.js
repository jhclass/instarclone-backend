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
// export const protectResolver = (user)=> {
//     console.log('a',user) // user 제대로 들어왔어?
//     if(!user){
//         //throw new Error("You need to login");
//         return { // 프론트에서 처리 할수 있도록 object 리턴
//             ok:false,
//             error:"you need to login"
//         }
//     }
// }
export const protectedResolver = (ourResolver)=>(root,arg,context,info)=>{
    console.log("a",context.loggedInUser);
    
    if(!context.loggedInUser){
        return {
            ok:false,
            error:"Login plz"
        }
    }
    return ourResolver(root,arg,context,info)
}
// export const protectedResolver = (ourResolver) => (
//     root,
//     args,
//     context,
//     info
//   ) => {
//     if (!context.loggedInUser) {
//       return {
//         ok: false,
//         error: "Please log in to perform this action.",
//       };
//     }
//     return ourResolver(root, args, context, info);
//   };

// export function protectedResolver(ourResolver) {
//     return function (root, args, context, info) {
//       if (!context.loggedInUser) {
//         return {
//           ok: false,
//           error: "Please log in to perform this action.",
//         };
//       }
//       return ourResolver(root, args, context, info);
//     };
//   }