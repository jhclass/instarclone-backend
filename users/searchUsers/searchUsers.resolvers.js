import client from "../../client"
export default {
    Query: {
        searchUsers:async(_,{keyword,lastId})=>{
            try {
                if (keyword.length<1){
                    throw new Error("키워드가 너무 잛음")
                }
                const searchResult = await client.user.findMany({where:{
                        username: {
                            //startsWith:keyword.toLowerCase(),
                            contains:keyword.toLowerCase(), // 동일한 글자가 (말그대로 포함) 있다면
                            //mode:"insensitive", //이걸 쓰면 .toLowerCase 를 사용할 필요가 없지
                        },
                    },
                    take:3,
                    skip:1,
                    ...(lastId&&{cursor:{id:lastId}})

                })
                return searchResult
                
            } catch (error) {
                console.log(error)
                return error
            }
        }    
    }
}