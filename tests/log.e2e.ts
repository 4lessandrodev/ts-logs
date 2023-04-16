import { S3Credentials, SavePayload } from "../lib/types";
import { Log } from "../lib/core/log";
import { Config } from "../lib/core/providers";
import { Step } from "../lib/core/step";
import { GlobalLog } from "../lib/core/global-log";
const accessKeyId = process.env.ACCESS_KEY_ID!;
const bucketName = process.env.BUCKET_NAME!;
const region = process.env.REGION! as any;
const secretAccessKey = process.env.SECRET_ACCESS_KEY!;

describe('integration test', () => {

    describe('http', () => {
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
    });

    describe('s3', () => {
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
    });

    describe("mongo", () => {
        it('should save log in local database', async () => {
            jest.setTimeout(900000);
            const log = GlobalLog.singleton({ name: 'test-log' });
            log.addStep(Step.create({}));

            const result = await log.publish(Config.Mongo({ url: 'mongodb://mongo:mongo@localhost:27017' }));
            console.log(result);

            expect(result?.statusCode).toBe(200);
            expect(result?.url).toBe(log.uid);
        });

        it('should update log and add step', async () => {
            jest.setTimeout(900000);
            const log = GlobalLog.singleton({ name: 'test-log' });
            log.addStep(Step.create({}));

            const result = await log.publish(Config.Mongo({ url: 'mongodb://mongo:mongo@localhost:27017' }));
            console.log(result);

            expect(result?.statusCode).toBe(200);
            expect(result?.url).toBe(log.uid);
        });
    });
});
