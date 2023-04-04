import client from "../../client"
import bcrypt from "bcrypt"
import { protectedResolver } from "../users.utils"
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
const { finished } = require('stream/promises');


const resolverFn = async (
    _,
    { firstName, lastName, username, email, password: newPassword,bio,avatar },
    { loggedInUser }
  ) => {
    console.log(avatar)
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
    Query: {
      uploads: (_ ,args) => {},
    },
    Mutation:{
        //update Pofile
        //first. First of all, proceed under the premise that the id is known. 
        //second. When changing a password, it is hashed and updated.
        //add option 1 : Do have token or not. Maybe this is real first better than others. 
        //add option 2 : if you send a user, not a token.
        //add option 3 : Protect Resolver
        editProfile: protectedResolver(resolverFn),
        singleUpload: async (parent, { file }) => {
          const { createReadStream, filename, mimetype, encoding } = await file;
    
          // Invoking the `createReadStream` will return a Readable Stream.
          // See https://nodejs.org/api/stream.html#stream_readable_streams
          const stream = createReadStream();
    
          // This is purely for demonstration purposes and will overwrite the
          // local-file-output.txt in the current working directory on EACH upload.
          const out = require('fs').createWriteStream('local-file-output.txt');
          stream.pipe(out);
          await finished(out);
    
          return { filename, mimetype, encoding };
        },
    }
}