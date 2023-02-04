import { S3Config } from "../lib/types";
import Config from "../lib/core/providers";

describe('config', () => {
    it('should create http config with success', () => {
        const httpConfig = Config.Http({ url: 'https://localhost.com' });
        expect(httpConfig).toEqual({ url: 'https://localhost.com' });
    });

    it('should throw if provide an invalid url', () => {
        const httpConfig = () => Config.Http({ url: 'localhost' });
        expect(httpConfig).toThrow();
    });

    it('should create a s3 config', () => {
        const config: S3Config = {
            bucketName: '',
            credentials: {
                accessKeyId: '',
                secretAccessKey: ''
            },
            region: 'us-east-1'
        };

        expect(Config.S3(config)).toEqual(config);
    });
});
