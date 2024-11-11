import {
    S3Client,
    PutObjectCommand,
    GetObjectCommandOutput,
  } from "@aws-sdk/client-s3";
import { FetchHttpHandler } from "@smithy/fetch-http-handler";

  //https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/cors.html

const s3Client = new S3Client({ region: 'us-west-2', 
    requestHandler: new FetchHttpHandler({ keepAlive: false }),
});
const BUCKET = "cps-web-server-target";

export default async function UploadToS3(file: File | null, dir:string){
    var fileContents = null;
    var uploadName = "";
    // if (file) {
    //         uploadName = file.name;
    //         const fileReader = new FileReader();
    //         fileReader.onload = () => {
    //             fileContents = fileReader.result as string;
    //         };
    // } else { Promise.reject("tried to upload a null file")};

    try{
        await s3Client.send(
        new PutObjectCommand({
            Bucket: BUCKET,
            Key: `cps-web-server-target/file1.txt`,
            Body: `this is a test file`,
        }));
    }catch(e){
        console.log(e);
        return Promise.reject("upload failed");
    }
};