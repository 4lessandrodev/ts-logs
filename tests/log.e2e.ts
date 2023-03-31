import { S3Credentials, SavePayload } from "../lib/types";
import { Log } from "../lib/core/log";
import { Config } from "../lib/core/providers";
import { Step } from "../lib/core/step";
const accessKeyId = process.env.ACCESS_KEY_ID!;
const bucketName = process.env.BUCKET_NAME!;
const region = process.env.REGION! as any;
const secretAccessKey = process.env.SECRET_ACCESS_KEY!;

it('should publish to http', async () => {
    jest.setTimeout(900000);
    const data = { echo: 'hello', info: { some: 'info' } };
    const step = Step.info({ name: 'Test', message: 'testing...', data });
    const log = Log.init({ name: 'Test', steps: [step] });
    const url = 'https://postback-4dev.onrender.com/test-log';
    const config = Config.Http({ url });
    const result = await log.publish(config);
    console.log(result?.url);
    expect(result).toEqual({ statusCode: 200, url } satisfies SavePayload);
});

it('should publish to s3', async () => {
    jest.setTimeout(900000);

    expect(accessKeyId).toBeDefined()
    expect(bucketName).toBeDefined()
    expect(region).toBeDefined()
    expect(secretAccessKey).toBeDefined()

    const credentials = { accessKeyId, secretAccessKey } satisfies S3Credentials;
    const config = Config.S3({ bucketName, credentials, region });
    const step = Step.info({ name: 'Test', message: 'testing...', data: 'hello world' });

    const log = Log.init({ name: 'Test', steps: [step] });
    const result = await log.publish(config);

    console.log(result?.url);
    expect(result?.statusCode).toBe(200);
    expect(result?.url).toBeDefined();
});

it('should publish to s3', async () => {
    jest.setTimeout(900000);

    expect(accessKeyId).toBeDefined()
    expect(bucketName).toBeDefined()
    expect(region).toBeDefined()
    expect(secretAccessKey).toBeDefined()
    const data = { echo: 'hello', info: { some: 'info' } };

    const credentials = { accessKeyId, secretAccessKey } satisfies S3Credentials;
    const config = Config.S3({ bucketName, credentials, region });
    const step = Step.info({ name: 'Test', message: 'testing...', data });

    const log = Log.init({ name: 'Test', steps: [step] });
    const result = await log.publish(config);

    console.log(result?.url);
    expect(result?.statusCode).toBe(200);
    expect(result?.url).toBeDefined();
});
