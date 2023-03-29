import client from "../client"

export default {

    Mutation: {
        createMovie:(_,{title,year,gener})=>{
            //console.log('create',title,year,gener);
            return client.movie.create({data:{title,year,gener}})
            
        },
        deleteMovie:async(_,{id})=> {
            //console.log('del',title,year,gener);
            console.log(id)
            const row = await client.movie.findUnique({
                where: {
                  id: id,
                },
              })
              console.log(id)
              
            console.log(row);
            if(!row){
                
                 throw console.error("없어영");
            }
            return client.movie.delete({where:{id:id}})
            
            
        }
    }

}