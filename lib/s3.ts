import "server-only";

import { S3Client } from "@aws-sdk/client-s3";

const credentials = {
	accessKeyId: process.env.S3_KEY_ID!,
	secretAccessKey: process.env.S3_SECRET!,
};

// Create an S3 service client object.
const s3Client = new S3Client({
	endpoint: process.env.S3_ENDPOINT!,
	credentials: credentials,
	region: "global",
});

export default s3Client;
