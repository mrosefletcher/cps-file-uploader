import type { NextApiRequest, NextApiResponse } from 'next'
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import {
  getSignedUrl,
  S3RequestPresigner,
} from "@aws-sdk/s3-request-presigner";
import https from "node:https";
import { XMLParser } from "fast-xml-parser";

 

const createPresignedUrlWithClient = ({ region, bucket, key }:{region:string, bucket:string, key:string}) => {
  const client = new S3Client({ region });
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
}; 

const put = (url : string, data: File) => {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      { method: "PUT", headers: { "Content-Length": new Blob([data]).size } },
      (res) => {
        let responseBody = "";
        res.on("data", (chunk) => {
          responseBody += chunk;
        });
        res.on("end", () => {
          const parser = new XMLParser();
          if(res.statusCode){
            if (res.statusCode >= 200 && res.statusCode <= 299) {
              resolve(parser.parse(responseBody, true));
            } else {
              reject(parser.parse(responseBody, true));
            }
          }
        });
      },
    );
    req.on("error", (err) => {
      reject(err);
    });
    req.write(data);
    req.end();
  });
};

export const main = async ({ region, bucketName, key }:{region:string, bucketName:string, key:string}) => {
  try {

    const clientUrl = await createPresignedUrlWithClient({
      bucket: bucketName,
      region,
      key,
    });

    // After you get the presigned URL, you can provide your own file
    // data. Refer to put() above.

    console.log("Calling PUT using presigned URL with client");
    //await put(clientUrl, new File());

    console.log("\nDone. Check your S3 console.");
  } catch (caught) {
    if (caught instanceof Error && caught.name === "CredentialsProviderError") {
      console.error(
        `There was an error getting your credentials. Are your local credentials configured?\n${caught.name}: ${caught.message}`,
      );
    } else {
      throw caught;
    }
  }
};

