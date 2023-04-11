import client from "../../client"
export default {
    Query: {
        searchUsers:async(_,{keyword})=>{
            try {
                if (keyword.length<1){
                    throw new Error("키워드가 너무 잛음")
                }
                const searchResult = await client.user.findMany({where:{
                        username: {
                            //startsWith:keyword.toLowerCase(),
                            contains:keyword.toLowerCase(),
                            //mode:"insensitive", //이걸 쓰면 .toLowerCase 를 사용할 필요가 없지
                        }
                    }})
                return searchResult
                
            } catch (error) {
                console.log(error)
                return error
            }
        }    
    }
}