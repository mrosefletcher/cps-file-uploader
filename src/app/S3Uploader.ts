import { STSClient, AssumeRoleCommand, AssumeRoleCommandOutput } from "@aws-sdk/client-sts";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromTemporaryCredentials } from "@aws-sdk/credential-providers";
// why do import statements "cannot file module" but the thing still compiles--------------------------------------

// Replace these values with your own
const roleArn = "arn:aws:iam::296062594787:role/AssumeRoleS3WriteOnly"; // The ARN of the role to assume
const roleSessionName = "session_name"; // A name for the session
const bucketName = "cps-web-server-target";
const regionName = "us-west-2";

export default async function UploadToS3(file: File | null, dir:string){
    
    var roleToAssume = {
        RoleArn: `${roleArn}`,
        RoleSessionName: "session1",
        DurationSeconds: 900,
      };

    //option 1
    // const AWS = require("aws-sdk");
    // AWS.config.update({ region: "us-west-2" });

    
    // var roleCreds;
    
    // // Create the STS service object
    // var sts = new AWS.STS({ apiVersion: "2011-06-15" });
    
    // //Assume Role
    // sts.assumeRole(roleToAssume, function (err: any, data?: AssumeRoleCommandOutput) {
    //   if (err) console.log(err, err.stack);
    //   else {
    //     roleCreds = {
    //       accessKeyId: data?.Credentials?.AccessKeyId,
    //       secretAccessKey: data?.Credentials?.SecretAccessKey,
    //       sessionToken: data?.Credentials?.SessionToken,
    //     };
    //   }
    // });

    //option 2

    //how does this program have creds to assume the role idgi
        try {
        // Create an STS client
        const stsClient = new STSClient({ region: regionName }); // Replace with your region

        // Assume the role to get temporary credentials
        const assumeRoleCommand = new AssumeRoleCommand(roleToAssume);
        const assumeRoleResponse = await stsClient.send(assumeRoleCommand);
        const credentials = assumeRoleResponse.Credentials;
            console.log(credentials)
            
        // Create an S3 client using the temporary credentials
        const s3Client = new S3Client({
            region: regionName,
            credentials: {
                accessKeyId: `${credentials?.AccessKeyId}`,
                secretAccessKey:  `${credentials?.SecretAccessKey}`,
            },
            // fromTemporaryCredentials({
            //     params: {
            //         RoleArn: roleArn,
            //         RoleSessionName: roleSessionName
            //     },
            //     clientConfig: { region: regionName }
            // })
        });        

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
};