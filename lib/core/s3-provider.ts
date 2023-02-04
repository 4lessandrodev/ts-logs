import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Logs, Provider, S3Config, SavePayload } from "../types";

const S3Provider: Provider<S3Config> = ({
    async save(config: S3Config, log: Readonly<Logs>): Promise<SavePayload> {
        const client = new S3Client({ region: config.region, credentials: config.credentials });
        const Key = `${log.name}/${log.uid}.log`;
        const Body = Buffer.from(JSON.stringify(log));
        const ContentType = 'application/json';
        const command = new PutObjectCommand({ Bucket: config.bucketName, Key, Body, ContentType });
        const url = `https://${config.bucketName}.s3.amazonaws.com/${Key}`;
        const result = await client.send(command);
        return { statusCode: result.$metadata.httpStatusCode ?? 200, url };
    }
});

export default S3Provider;
