import { CreateBucketCommand, GetObjectCommand, ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { doClient } from "./doClient.js";
import RNFS, { readFile } from "react-native-fs";

export const uploadImage = async (uri, accountId, fileName) => {

  const blob = await RNFS.readFile(uri, "base64");

  const bucketParams = {
    Bucket: "horizones-space",
    Key: "travelope/user_contents/" + accountId + "/" + fileName,
    Body: blob,
  };

  try {
    const data = await doClient.send(new PutObjectCommand(bucketParams));
    console.log(
      "Successfully uploaded object: " +
      bucketParams.Bucket +
      "/" +
      bucketParams.Key,
    );
    return data;
  } catch (err) {
    console.log("[uploadImage] Error ", err);
  }
};

export const findAndDownloadImage = async (accountId, fileName) => {

  const bucketParams = {
    Bucket: "horizones-space",
    Key: "travelope/user_contents/" + accountId + "/" + fileName,
  };

  const streamToString = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
  };

  try {
    const response = await doClient.send(new GetObjectCommand(bucketParams));
    const blob = await streamToString(response.Body)

    await RNFS.writeFile(RNFS.DocumentDirectoryPath + "/travelope/" + fileName + "base64X", blob)
    console.log(blob)

    return blob;

  } catch (err) {
    console.log("[findAndDownloadImage] Error ", err);
  }

};

// export const run = async (uri) => {
//
//   const bucketParams = {
//     Bucket: "horizones-space",
//     Key: "travelope/234255/nextDD.jpg",
//     Body: readFile(uri)
//   };
//
//   try {
//     const parallelUploads3 = new Upload({
//
//       client: doClient,
//       // tags: [...], // optional tags
//       // queueSize: 4, // optional concurrency configuration
//       // leavePartsOnError: false, // optional manually handle dropped parts
//       params: bucketParams,
//     });
//
//     parallelUploads3.on("httpUploadProgress", (progress) => {
//       console.log(progress);
//     });
//
//     await parallelUploads3.done();
//   } catch (e) {
//     console.log(e);
//   }
// }
