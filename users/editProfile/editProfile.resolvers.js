import client from "../../client"

import bcrypt from "bcrypt"
import { protectedResolver } from "../users.utils"
import { GraphQLUpload } from "graphql-upload";
import {createWriteStream} from 'fs'

console.log(__dirname);
const resolverFn = async (
    _,
    { firstName, lastName, username, email, password: newPassword,bio,avatar },
    { loggedInUser }
  ) => {
    let avatarUrl = null;
    if(avatar){
    const {filename,createReadStream} = await avatar;
    const newFilename = `${loggedInUser.id}_${Date.now()}_${filename}`
    console.log(newFilename)
    const readStream = createReadStream();
    const writeStream = createWriteStream(process.cwd()+'/uploads/'+newFilename);
    readStream.pipe(writeStream);
    avatarUrl=`http://localhost:4000/uploads/${newFilename}`;
    }
    let uglyPassword = null;
    if (newPassword) {
      uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        firstName,
        lastName,
        username,
        email,
        bio,
        ...(uglyPassword && { password: uglyPassword }),
        ...(avatarUrl&&{avatar:avatarUrl})
      },
    });
    if (updatedUser.id) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: "Could not update profile.",
      };
    }
  };
  


export default {

  Upload: GraphQLUpload,
    Mutation:{
        //update Pofile
        //first. First of all, proceed under the premise that the id is known. 
        //second. When changing a password, it is hashed and updated.
        //add option 1 : Do have token or not. Maybe this is real first better than others. 
        //add option 2 : if you send a user, not a token.
        //add option 3 : Protect Resolver
        editProfile: protectedResolver(resolverFn),
        
    }
}