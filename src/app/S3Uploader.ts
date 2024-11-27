import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export default async function UploadToS3(file: File | null, dir:string){


    const s3Client = new S3Client({ region: 'us-west-2', /*credentials?*/ });
    const bucketName = "cps-web-server-target";

    // Read the file content
    var fileContents = null;
    var uploadName = "";
    if (file) {
        uploadName = file.name;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            fileContents = fileReader.result as string;
        };
    } else { Promise.reject("tried to upload a null file")};

    // Upload the file to S3
    try{
        const putObjectCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: uploadName,
            Body: `${fileContents}`
        });
        await s3Client.send(putObjectCommand);

        console.log("File uploaded successfully.");
    } catch (err) {
        console.error("An error occurred:", err);
        return Promise.reject("upload failed");
    }
}
