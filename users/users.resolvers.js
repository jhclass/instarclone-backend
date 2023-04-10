import client from "../client"

export default {
    User : {
        totalFollowing:({username})=>{
            return client.user.count({
                where:{
                    following:{
                        some:{
                            username
                        }
                    }
                }
            })
        },
        totalFollower:(root)=>{ //위에랑 같은말입니다.
            const username = root.username;
            return client.user.count({
                where:{
                    follower: {
                        some:{
                            username
                        }
                    }
                }
            });
        },
        isMe:({username},_,context)=>{
            //console.log(username,context.loggedInUser)
            if(username==context.loggedInUser.username){
                return true
            }else{
                return false
            }
        },
        isFollowing:async({username},_,{loggedInUser})=>{ //username을 userId 로 생각해
            if(!loggedInUser){
                return false
            }
            const exists = await client.user
            .findUnique({where:{username:loggedInUser.username}})//로그인한 username 을 찾고
            .following({where:{username}})//following 하고 있는지
            return exists.length !== 0 //true false 를 상황에 따라 반환하겠지
        }

        
    }
}