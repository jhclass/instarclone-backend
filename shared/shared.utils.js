import AWS from "aws-sdk";
AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});
const s3 = new AWS.S3();
export const uploadToS3 = async (file, userId, folderName) => {
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const { Location } = await s3
        .upload({
            Bucket: "instaclone-uploadsss",
            Key: objectName,
            ACL: "public-read",
            Body: readStream,
        })
        .promise();
    //console.log(Location)
    return Location;
};


export const deleteToS3 = async (fileUrl, folderName) => {
    const decodedUrl = decodeURI(fileUrl);
    const filePath = decodedUrl.split(`/${folderName}/`)[1];
    const fileName = `${folderName}/${filePath}`;
    await s3.deleteObject({
        Bucket: "instaclone-uploadsss", // 본인 버킷 이름
        Key: fileName,
    }).promise();

}