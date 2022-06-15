import { CreateBucketCommand, ListBucketsCommand } from "@aws-sdk/client-s3";
import { doClient } from "./doClient.js";

export const runList = async () => {
  try {
    const data = await doClient.send(new ListBucketsCommand({}));
    console.log("DO Success", data.Buckets);
    return data; // For unit tests.
  } catch (err) {
    console.log("DO Error", err);
  }
};

// Specifies a path within your Space and the file to upload.
export const bucketParams = {
  Bucket: "example-space-name",
  Key: "example.txt",
  Body: "content"
};

// Uploads the specified file to the chosen path.
export const run = async () => {
  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    console.log(
      "Successfully uploaded object: " +
      bucketParams.Bucket +
      "/" +
      bucketParams.Key
    );
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
