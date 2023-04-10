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
        }
        
    }
}