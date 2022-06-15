import { S3, S3Client } from "@aws-sdk/client-s3";
import {URL} from "react-native-url-polyfill";

const AccessKey = "TBJ2DQZQ25ZGOBDG7HL4"
const SecretKey = "kWHBT3M003tRPncNycmXPFbRaJpLmNWU5AjY5d3QR68"
const EndPoint = new URL("https://sgp1.digitaloceanspaces.com")

const doClient = new S3Client({

  endpoint: EndPoint,
  region: "us-east-1",
  credentials: {
    accessKeyId: AccessKey,
    secretAccessKey: SecretKey
  }
});

export { doClient };

