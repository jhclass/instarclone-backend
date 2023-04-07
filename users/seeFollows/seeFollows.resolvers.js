import client from "../../client"

export default {
    Query:{
        seeFollows: async(_,{username,page})=>{
            const ok = await client.user.findUnique({
                where:{username},
                select: {id:true,username:true}
       
            });
            console.log(ok);
            if(!ok){
                return {
                    ok:false,
                    error:"That user does not exist"
                }
            }
            const follower = await client.user.findUnique({where:{username}}).follower(
                {
                    take:5,
                    skip:(page-1)*5
                }
            );
            const totalFollowers = await client.user.count({where:{
                following:{some:{username}}
            }});
            //follower 라는 필드의 값을 가져오는거야 너의 테이블의 필드명을 확인하자
            //findMany() 가 아니라 count() 쓰면 단순히 숫자를 세기 때문에 length 도 필요없지.
          console.log(follower);
          return {
            ok:true,
            follower,
            totalPages:Math.ceil(totalFollowers/5)

          }
            
        }
    }
}